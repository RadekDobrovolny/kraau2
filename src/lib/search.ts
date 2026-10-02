export interface SearchDocument {
  id: string;
  type: 'kriteria' | 'ukazky';
  code: string;
  title: string;
  url: string;
  context: string;
  excerpt: string;
  body: string;
  area: string[];
  phase: string[];
  topic: string[];
  exampleType: string[];
  subject: string[];
  school: string[];
  age: string[];
  aliases: string[];
  situations: { title: string; aliases: string[]; explanation: string; order: number }[];
}
export const filterKeys = [
  'area',
  'phase',
  'topic',
  'contentType',
  'exampleType',
  'subject',
  'school',
  'age',
] as const;
export type FilterKey = (typeof filterKeys)[number];
export type SearchFilters = Record<FilterKey, string[]>;
export interface SearchState {
  q: string;
  filters: SearchFilters;
  page: number;
}
export interface FilterOption {
  value: string;
  label: string;
}
export type FilterOptions = Record<FilterKey, FilterOption[]>;
export const parameterNames: Record<FilterKey, string> = {
  area: 'oblast',
  phase: 'faze',
  topic: 'tema',
  contentType: 'typ',
  exampleType: 'ukazka',
  subject: 'predmet',
  school: 'stupen',
  age: 'vek',
};
export const emptyFilters = (): SearchFilters => ({
  area: [],
  phase: [],
  topic: [],
  contentType: [],
  exampleType: [],
  subject: [],
  school: [],
  age: [],
});
export function normalize(text: string) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');
}
const compare = (a: string, b: string) => a.localeCompare(b, 'cs', { numeric: true });

export function parseSearchState(params: URLSearchParams, options: FilterOptions, catalog = false) {
  const filters = emptyFilters();
  const warnings: string[] = [];
  for (const key of filterKeys) {
    const values = params.getAll(parameterNames[key]);
    const allowed = new Set(options[key].map((o) => o.value));
    filters[key] = [...new Set(values.filter((v) => allowed.has(v)))].sort(compare);
    if (values.some((v) => !allowed.has(v)))
      warnings.push('Část filtru není dostupná a byla vynechána.');
  }
  if (filters.exampleType.length || catalog) {
    if (filters.contentType.includes('kriteria'))
      warnings.push('Výběr typu ukázky nastavil obsah na ukázky.');
    filters.contentType = ['ukazky'];
  }
  const rawPage = params.get('strana') ?? '1';
  const page = /^[1-9]\d{0,5}$/.test(rawPage) ? Number(rawPage) : 1;
  if (page === 1 && rawPage !== '1')
    warnings.push('Neplatná stránka byla nahrazena první stránkou.');
  const known = new Set(['q', 'strana', ...Object.values(parameterNames)]);
  if ([...params.keys()].some((k) => !known.has(k)))
    warnings.push('Neznámý parametr byl vynechán.');
  return {
    state: { q: (params.get('q') ?? '').trim().slice(0, 240), filters, page },
    warnings: [...new Set(warnings)],
  };
}
export function serializeSearchState(state: SearchState) {
  const params = new URLSearchParams();
  if (state.q) params.set('q', state.q);
  for (const key of filterKeys)
    for (const value of [...state.filters[key]].sort(compare))
      params.append(parameterNames[key], value);
  if (state.page > 1) params.set('strana', String(state.page));
  return params;
}
export function passesFilters(doc: SearchDocument, filters: SearchFilters, omit?: FilterKey) {
  return filterKeys.every(
    (key) =>
      key === omit ||
      filters[key].length === 0 ||
      (key === 'contentType'
        ? filters[key].includes(doc.type)
        : filters[key].some((v) => doc[key].includes(v))),
  );
}
const stopwords = new Set([
  'a',
  'i',
  'se',
  'si',
  've',
  'v',
  'na',
  'do',
  'to',
  'jak',
  'co',
  'je',
  'jsou',
  'pro',
  's',
  'z',
  'o',
  'k',
  'aby',
  'ze',
  'jsem',
  'chci',
  'mam',
  'mi',
  'me',
  'mne',
  'nevim',
]);
export function rankDocument(
  doc: SearchDocument,
  q: string,
): { score: number; reason: string } | null {
  const query = normalize(q);
  if (!query) return { score: 1, reason: 'Odpovídá zvoleným filtrům' };
  const codeQuery = query.replaceAll('-', '.');
  if (/^\d\.\d\.\d$/.test(codeQuery))
    return doc.code === codeQuery ? { score: 100000, reason: 'Přesná shoda kódu kritéria' } : null;
  const terms = query
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .split(' ')
    .filter((t) => t && !stopwords.has(t));
  if (!terms.length) return null;
  const title = normalize(doc.title),
    context = normalize(doc.context);
  const matchedSituation = doc.situations.find((s) =>
    [s.title, ...s.aliases].some((alias) => {
      const normalized = normalize(alias);
      return (
        normalized === query || (query.length >= 5 && ` ${normalized} `.includes(` ${query} `))
      );
    }),
  );
  if (matchedSituation)
    return {
      score:
        4000 +
        (normalize(matchedSituation.title) === query ? 100 : 0) +
        Math.max(0, 20 - matchedSituation.order),
      reason: `Redakční námět: ${matchedSituation.explanation}`,
    };
  if (title.includes(query)) return { score: 5000, reason: 'Shoda v názvu' };
  if (terms.every((t) => title.includes(t))) return { score: 3000, reason: 'Shoda v názvu' };
  const metadata = normalize([...doc.topic, ...doc.aliases, doc.context].join(' '));
  if (terms.every((t) => metadata.includes(t)))
    return { score: 2000, reason: 'Shoda v tématu nebo kompetenci' };
  const body = normalize(doc.body);
  if (terms.every((t) => `${title} ${context} ${body}`.includes(t)))
    return {
      score: 500 + terms.filter((t) => title.includes(t)).length * 30,
      reason: 'Shoda v popisu jednání nebo v textu ukázky',
    };
  return null;
}
export function searchDocuments(documents: SearchDocument[], state: SearchState) {
  if (!state.q && !filterKeys.some((k) => state.filters[k].length)) return [];
  return documents
    .flatMap((doc) => {
      if (!passesFilters(doc, state.filters)) return [];
      const rank = rankDocument(doc, state.q);
      return rank ? [{ doc, ...rank }] : [];
    })
    .sort(
      (a, b) =>
        b.score - a.score ||
        compare(a.doc.type, b.doc.type) ||
        compare(a.doc.code || a.doc.id, b.doc.code || b.doc.id),
    );
}
export function facetCount(
  documents: SearchDocument[],
  state: SearchState,
  key: FilterKey,
  value: string,
) {
  return documents.filter(
    (doc) =>
      rankDocument(doc, state.q) &&
      passesFilters(doc, state.filters, key) &&
      (key === 'contentType' ? doc.type === value : doc[key].includes(value)),
  ).length;
}
