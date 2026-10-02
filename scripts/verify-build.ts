import { readFileSync, readdirSync, existsSync, statSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import assert from 'node:assert/strict';
import { gzipSync } from 'node:zlib';
import { parse, type DefaultTreeAdapterMap } from 'parse5';
type Node = DefaultTreeAdapterMap['node'];
const root = resolve('dist');
const files = (directory: string): string[] =>
  readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? files(path) : [path];
  });
const allFiles = files(root);
const htmlFiles = allFiles.filter((f) => f.endsWith('.html'));
const [owner, repo] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const base =
  (process.env.BASE_PATH ?? (repo && repo !== `${owner}.github.io` ? `/${repo}/` : '/')).replace(
    /\/$/,
    '',
  ) + '/';
const trees = new Map<string, Node>();
const ids = new Map<string, Set<string>>();
function walk(node: Node, visitor: (node: Node) => void) {
  visitor(node);
  if ('childNodes' in node) node.childNodes.forEach((child) => walk(child, visitor));
}
const attrs = (node: Node) =>
  'attrs' in node ? Object.fromEntries(node.attrs.map((a) => [a.name, a.value])) : {};
for (const file of htmlFiles) {
  const tree = parse(readFileSync(file, 'utf8'));
  trees.set(file, tree);
  const foundIds: string[] = [];
  walk(tree, (n) => {
    const a = attrs(n);
    if (a.id) foundIds.push(a.id);
  });
  assert.equal(foundIds.length, new Set(foundIds).size, `Duplicate HTML ID in ${file}`);
  ids.set(file, new Set(foundIds));
}
let links = 0;
for (const [file, tree] of trees) {
  const pagePath = file
    .slice(root.length)
    .replace(/index\.html$/, '')
    .replace(/\\/g, '/');
  walk(tree, (node) => {
    const attributes = attrs(node);
    for (const key of ['href', 'src', 'action', 'poster']) {
      const value = attributes[key];
      if (
        !value ||
        value.startsWith('data:') ||
        value.startsWith('mailto:') ||
        value.startsWith('tel:')
      )
        continue;
      const url = new URL(value, `http://local.test${base.replace(/\/$/, '')}${pagePath}`);
      if (url.origin !== 'http://local.test') continue;
      assert(url.pathname.startsWith(base), `Link escapes base ${base}: ${value} in ${file}`);
      const relative = decodeURIComponent(url.pathname.slice(base.length));
      let target = join(root, relative);
      if (existsSync(target) && statSync(target).isDirectory()) target = join(target, 'index.html');
      assert(existsSync(target), `Broken link ${value} in ${file}`);
      if (url.hash && target.endsWith('.html'))
        assert(
          ids.get(target)?.has(decodeURIComponent(url.hash.slice(1))),
          `Missing anchor ${value} in ${file}`,
        );
      links++;
    }
  });
}
assert(existsSync(join(root, '404.html')), 'Missing 404.html');
assert(existsSync(join(root, 'sitemap.xml')), 'Missing sitemap');
const index = JSON.parse(readFileSync(join(root, 'search-index.json'), 'utf8'));
assert.equal(index.documents.length, 67);
assert(
  !readFileSync(join(root, 'search-index.json'), 'utf8').includes('internalReference'),
  'Internal content in search index',
);
const indexGzip = gzipSync(readFileSync(join(root, 'search-index.json'))).length;
assert(indexGzip <= 500_000, 'Search index exceeds budget');
const javascriptGzip = allFiles
  .filter((f) => f.endsWith('.js'))
  .reduce((n, f) => n + gzipSync(readFileSync(f)).length, 0);
const report = {
  pages: htmlFiles.length,
  checkedLinks: links,
  searchDocuments: index.documents.length,
  searchIndexGzipBytes: indexGzip,
  totalJavascriptGzipBytes: javascriptGzip,
  base,
  passed: true,
};
writeFileSync('build-validation.json', JSON.stringify(report, null, 2) + '\n');
console.log(
  `Build verified: ${htmlFiles.length} HTML pages, ${links} local links, ${Math.round(indexGzip / 1024)} kB gzip search index, ${Math.round(javascriptGzip / 1024)} kB gzip JavaScript across the entire site. Base ${base}`,
);
