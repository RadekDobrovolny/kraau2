import { readFileSync, readdirSync } from 'node:fs';
const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'));
const manifest = read('src/data/manifest.json');
const gaps: string[] = [];
if (!manifest.methodologicalApproval)
  gaps.push('Import rámce nemá dohledatelné metodické schválení.');
for (const directory of ['criteria', 'examples', 'transitions']) {
  const records = readdirSync(`src/content/${directory}`)
    .filter((f) => f.endsWith('.json'))
    .map((f) => read(`src/content/${directory}/${f}`));
  if (records.some((r) => r.status === 'demo' || r.status === 'imported'))
    gaps.push(`${directory}: obsah stále zahrnuje neověřený import nebo modelové položky.`);
}
const transitions = readdirSync('src/content/transitions')
  .map((f) => read(`src/content/transitions/${f}`))
  .filter((t) => t.status === 'published');
if (transitions.length !== 183)
  gaps.push(`Schválené sousední komentáře: ${transitions.length}/183.`);
if (gaps.length) {
  console.error('Tento build je prototyp, nikoli schválené vydání P1:\n' + gaps.join('\n'));
  process.exit(1);
}
console.log('Content release approved.');
