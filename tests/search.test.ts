import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  emptyFilters,
  normalize,
  parseSearchState,
  passesFilters,
  rankDocument,
  searchDocuments,
  serializeSearchState,
  facetCount,
  type SearchDocument,
  type FilterOptions,
} from '../src/lib/search';
import { situations } from '../src/data/editorial';

const source = JSON.parse(readFileSync('src/data/imported/framework-v1.json', 'utf8'));
const documents: SearchDocument[] = source.criteria.map(
  (c: { id: string; title: string; levels: string[]; mindset: string }) => ({
    id: c.id,
    type: 'kriteria',
    code: c.id,
    title: c.title,
    url: `/ramec/kriteria/${c.id}/`,
    context: '',
    excerpt: c.levels[2],
    body: [...c.levels, c.mindset].join(' '),
    area: [c.id[0]],
    phase: ['realizace'],
    topic: ['zapojeni'],
    exampleType: [],
    subject: [],
    school: [],
    age: [],
    aliases: [],
    situations: situations
      .filter((s) => s.codes.includes(c.id))
      .map((s) => ({
        title: s.title,
        aliases: s.aliases,
        explanation: s.explanation,
        order: s.codes.indexOf(c.id),
      })),
  }),
);
const state = (q: string) => ({ q, filters: emptyFilters(), page: 1 });
const options: FilterOptions = {
  area: [
    { value: '4', label: 'Podpora učení' },
    { value: '5', label: 'Hodnocení' },
  ],
  phase: [{ value: 'realizace', label: 'Realizace' }],
  topic: [{ value: 'zapojeni', label: 'Zapojení' }],
  contentType: [
    { value: 'kriteria', label: 'Kritéria' },
    { value: 'ukazky', label: 'Ukázky' },
  ],
  exampleType: [{ value: 'transkript', label: 'Transkript' }],
  subject: [],
  school: [],
  age: [],
};
test('all exact codes rank first, including original hyphen aliases', () => {
  for (const doc of documents) {
    assert.equal(searchDocuments(documents, state(doc.code))[0]?.doc.code, doc.code);
    assert.equal(
      searchDocuments(documents, state(doc.code.replaceAll('.', '-')))[0]?.doc.code,
      doc.code,
    );
  }
});
test('diacritics and whitespace normalize', () => {
  assert.equal(normalize('  ŽÁCI   se nezapojují '), 'zaci se nezapojuji');
  assert.deepEqual(
    searchDocuments(documents, state('Žáci se nezapojují')).map((r) => r.doc.id),
    searchDocuments(documents, state('zaci se nezapojuji')).map((r) => r.doc.id),
  );
});
test('every editorial situation has a mapped result in top five', () => {
  for (const situation of situations) {
    assert(
      searchDocuments(documents, state(situation.title))
        .slice(0, 5)
        .some((r) => situation.codes.includes(r.doc.code)),
      situation.title,
    );
  }
});
test('opposite meaning is not treated as exact fear situation', () => {
  const negative = searchDocuments(documents, state('žáci se nebojí chyb'));
  assert.equal(negative[0].doc.code, '5.3.2');
  assert(!negative[0].reason.includes('bezpečným prostředím'));
  assert(!negative.some((r) => r.doc.code === '3.2.2' && r.score >= 4000));
});
test('filters use OR within group and AND between groups', () => {
  const f = { ...emptyFilters(), area: ['4', '5'], phase: ['realizace'] };
  assert(
    passesFilters(
      documents.find((d) => d.code === '4.2.2')!,
      f,
    ),
  );
  assert(
    !passesFilters(
      documents.find((d) => d.code === '3.2.2')!,
      f,
    ),
  );
  f.phase = ['planovani'];
  assert(
    !passesFilters(
      documents.find((d) => d.code === '4.2.2')!,
      f,
    ),
  );
});
test('an excluding filter wins over exact code', () => {
  const s = state('4.2.2');
  s.filters.area = ['5'];
  assert.equal(searchDocuments(documents, s).length, 0);
});
test('unfiltered empty search shows suggestions, not entire corpus', () => {
  assert.equal(searchDocuments(documents, state('')).length, 0);
  assert.equal(rankDocument(documents[0], 'unlikely-extraterrestrial-term'), null);
});
test('state serializes repeated filters and round trips', () => {
  const s = state('žáci');
  s.filters.area = ['5', '4'];
  s.filters.topic = ['zapojeni'];
  s.page = 2;
  const serialized = serializeSearchState(s);
  assert.equal(serialized.getAll('oblast').length, 2);
  const parsed = parseSearchState(serialized, options);
  assert.deepEqual(parsed.state, { ...s, filters: { ...s.filters, area: ['4', '5'] } });
});
test('invalid parameters preserve valid filters and explain omission', () => {
  const parsed = parseSearchState(
    new URLSearchParams('q=4.2.2&oblast=4&oblast=999&strana=-3&neco=1'),
    options,
  );
  assert.deepEqual(parsed.state.filters.area, ['4']);
  assert.equal(parsed.state.page, 1);
  assert(parsed.warnings.length >= 2);
});
test('example type explicitly resolves conflicting content type', () => {
  const parsed = parseSearchState(new URLSearchParams('typ=kriteria&ukazka=transkript'), options);
  assert.deepEqual(parsed.state.filters.contentType, ['ukazky']);
  assert(parsed.warnings.some((w) => w.includes('ukázky')));
});
test('facet counts ignore own group and honor other groups', () => {
  const s = state('');
  s.filters.area = ['5'];
  assert.equal(facetCount(documents, s, 'area', '4'), 10);
  s.filters.phase = ['planovani'];
  assert.equal(facetCount(documents, s, 'area', '4'), 0);
});
