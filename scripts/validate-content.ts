import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { criterionSchema, exampleSchema, transitionSchema } from '../src/lib/schema';
import { related, situations, topics } from '../src/data/editorial';

const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'));
const content = (dir: string) =>
  readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((file) => ({ file, value: read(`${dir}/${file}`) }));
const framework = read('src/data/framework.json');
const manifest = read('src/data/manifest.json');
const imported = read('src/data/imported/framework-v1.json');
const revisions = content('src/content/criteria').map(({ value }) => criterionSchema.parse(value));
const examples = content('src/content/examples').map(({ value }) => exampleSchema.parse(value));
const transitions = content('src/content/transitions').map(({ value }) =>
  transitionSchema.parse(value),
);
const unique = (items: string[], label: string) =>
  assert.equal(new Set(items).size, items.length, `Duplicate ${label}`);
const publicStatus = (status: string) => ['published', 'imported', 'demo'].includes(status);
unique(
  framework.areas.map((a: { id: string }) => a.id),
  'area IDs',
);
unique(
  framework.competencies.map((c: { id: string }) => c.id),
  'competency IDs',
);
unique(
  framework.identities.map((c: { id: string }) => c.id),
  'criterion IDs',
);
unique(
  framework.identities.map((c: { publicCode: string }) => c.publicCode),
  'criterion codes',
);
unique(
  revisions.map((r) => r.id),
  'revision IDs',
);
unique(
  revisions.flatMap((r) => r.levels.map((l) => l.id)),
  'descriptor IDs',
);
unique(
  examples.map((e) => e.id),
  'example IDs',
);
unique(
  examples.map((e) => e.publicId),
  'example public IDs',
);
unique(
  examples.flatMap((e) => e.links.map((l) => l.id)),
  'link IDs',
);
assert.deepEqual(
  [framework.areas.length, framework.competencies.length, framework.identities.length],
  [6, 19, 61],
);
for (const c of framework.competencies)
  assert(
    framework.areas.some((a: { id: string }) => a.id === c.areaId),
    `Missing area for ${c.code}`,
  );
const topicIds = new Set(topics.map((t) => t.slug));
for (const c of framework.identities) {
  assert(
    framework.competencies.some((competency: { id: string }) => competency.id === c.competencyId),
  );
  assert(
    c.topics.every((topic: string) => topicIds.has(topic)),
    `Unknown topic for ${c.publicCode}`,
  );
  const published = revisions.filter((r) => r.criterionId === c.id && publicStatus(r.status));
  assert.equal(published.length, 1, `Expected one public revision for ${c.publicCode}`);
  const revision = published[0],
    original = imported.criteria.find((r: { id: string }) => r.id === c.publicCode);
  assert.deepEqual(revision.levels.map((l) => l.level).sort(), [0, 1, 2, 3]);
  assert.equal(revision.editionId, manifest.frameworkEditionId);
  assert.equal(revision.sourceLocator.documentId, manifest.sourceDocument.id);
  assert.equal(revision.sourceLocator.page, original.sourcePage);
  assert.equal(revision.title, original.title);
  assert.equal(revision.mindset, original.mindset);
  assert.deepEqual(
    revision.levels.map((l) => l.text),
    original.levels,
  );
}
for (const e of examples) {
  assert(e.topics.every((t) => topicIds.has(t)));
  if (e.status === 'published') {
    assert.equal(e.rights.permissionStatus, 'approved');
    assert(e.reviewedAt, 'Published example needs review date');
  }
  if (e.status === 'demo') assert.equal(e.rights.permissionStatus, 'original-demo');
  for (const link of e.links) {
    const r = revisions.find((r) => r.id === link.criterionRevisionId);
    assert(r, `Missing revision for example ${e.publicId}`);
    const identity = framework.identities.find(
      (c: { publicCode: string }) => c.publicCode === link.criterionCode,
    );
    assert.equal(r.criterionId, identity.id);
    if (link.level !== null) assert(r.levels.some((l) => l.level === link.level));
  }
}
unique(
  transitions.map((t) => `${t.criterionRevisionId}:${t.fromLevel}:${t.toLevel}`),
  'transition pairs',
);
for (const t of transitions) {
  const revision = revisions.find((r) => r.id === t.criterionRevisionId);
  assert(revision);
  assert(t.fromLevel < t.toLevel);
  for (const highlight of t.highlights) {
    const descriptor = revision.levels.find((l) => l.id === highlight.descriptorId);
    assert(descriptor && [t.fromLevel, t.toLevel].includes(descriptor.level));
    let at = -1,
      offset = 0;
    for (let i = 0; i <= highlight.occurrence; i++) {
      at = descriptor.text.indexOf(highlight.phrase, offset);
      assert(at >= 0, `Missing quoted highlight: ${t.id}: ${highlight.phrase}`);
      offset = at + highlight.phrase.length;
    }
  }
}
for (const s of situations) {
  assert(s.codes.length);
  for (const code of s.codes)
    assert(framework.identities.some((c: { publicCode: string }) => c.publicCode === code));
}
for (const r of related) {
  assert.notEqual(r.sourceCode, r.targetCode);
  assert(r.explanation.length);
  for (const code of [r.sourceCode, r.targetCode])
    assert(framework.identities.some((c: { publicCode: string }) => c.publicCode === code));
}
unique(
  framework.aliases.map((a: { oldPath: string }) => a.oldPath),
  'legacy paths',
);
const stableIds = new Set(
  [...framework.areas, ...framework.competencies, ...framework.identities].map(
    (r: { id: string }) => r.id,
  ),
);
for (const alias of framework.aliases) assert(stableIds.has(alias.targetStableId));
const sourceHash = createHash('sha256')
  .update(readFileSync('public/kompetencni-ramec-ss.pdf'))
  .digest('hex');
assert.equal(sourceHash, manifest.sourceDocument.fileHash);
const report = {
  schemaVersion: 1,
  release: manifest.contentReleaseId,
  counts: {
    areas: framework.areas.length,
    competencies: framework.competencies.length,
    criteria: framework.identities.length,
    descriptors: revisions.length * 4,
    examples: examples.filter((e) => publicStatus(e.status)).length,
    situations: situations.length,
    transitions: transitions.filter((t) => publicStatus(t.status)).length,
    related: related.length,
    legacyRoutes: framework.aliases.length,
  },
  sourceHash,
  validation: 'passed',
  methodologicalApproval: manifest.methodologicalApproval,
  limitations: [
    '61 imported criterion revisions need methodological approval.',
    '6 synthetic examples and their links need methodological review.',
    '22 situation mappings and 13 related links are editorial demonstrations.',
    'Only 9 of 183 adjacent transition comments are demonstrated; none are approved.',
    'GitHub Pages supports HTML redirects, not configurable HTTP 301/410 responses.',
  ],
};
writeFileSync('content-validation.json', JSON.stringify(report, null, 2) + '\n');
writeFileSync(
  'public/content-manifest.json',
  JSON.stringify({ ...manifest, counts: report.counts }, null, 2) + '\n',
);
writeFileSync(
  'public/content-schema.json',
  JSON.stringify(
    zodToJsonSchema(
      z.object({
        criterion: criterionSchema,
        example: exampleSchema,
        transition: transitionSchema,
      }),
      { name: 'KraauContent', target: 'jsonSchema7' },
    ),
    null,
    2,
  ) + '\n',
);
console.log(
  `Content validation passed: ${revisions.length} criterion revisions, ${examples.length} synthetic examples, ${transitions.length} demonstration comments. Source text unchanged.`,
);
console.log('Methodological approval remains pending. See content-validation.json.');
