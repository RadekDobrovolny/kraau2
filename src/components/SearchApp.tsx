import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Search,
  SlidersHorizontal,
  ChevronDown,
  X,
  Link,
  Info,
} from 'lucide-react';
import {
  emptyFilters,
  facetCount,
  filterKeys,
  parameterNames,
  parseSearchState,
  searchDocuments,
  serializeSearchState,
  type SearchState,
  type SearchDocument,
  type FilterKey,
  type FilterOptions,
} from '../lib/search';

interface Props {
  indexUrl: string;
  frameworkUrl: string;
  options: FilterOptions;
  suggestions: { title: string; url: string }[];
  catalog?: boolean;
}
const groupLabels: Record<FilterKey, string> = {
  area: 'Oblast',
  phase: 'Fáze výuky',
  topic: 'Téma',
  contentType: 'Typ obsahu',
  exampleType: 'Typ ukázky',
  subject: 'Předmět',
  school: 'Stupeň školy',
  age: 'Věková skupina',
};
const initialState: SearchState = { q: '', filters: emptyFilters(), page: 1 };

export default function SearchApp({
  indexUrl,
  frameworkUrl,
  options,
  suggestions,
  catalog = false,
}: Props) {
  const [state, setState] = useState<SearchState>(() => ({
    ...initialState,
    filters: { ...emptyFilters(), contentType: catalog ? ['ukazky'] : [] },
  }));
  const [query, setQuery] = useState('');
  const [draft, setDraft] = useState(state.filters);
  const [documents, setDocuments] = useState<SearchDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [shareStatus, setShareStatus] = useState('');
  const [shareFallback, setShareFallback] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(true);
  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const resize = () => setFiltersOpen(!media.matches);
    resize();
    media.addEventListener('change', resize);
    return () => media.removeEventListener('change', resize);
  }, []);
  useEffect(() => {
    const restore = () => {
      const parsed = parseSearchState(new URLSearchParams(location.search), options, catalog);
      setState(parsed.state);
      setDraft(parsed.state.filters);
      setQuery(parsed.state.q);
      setWarnings(parsed.warnings);
    };
    restore();
    window.addEventListener('popstate', restore);
    return () => window.removeEventListener('popstate', restore);
  }, [options, catalog]);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    fetch(indexUrl, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error('index');
        return r.json();
      })
      .then((data: { schemaVersion: number; documents: SearchDocument[] }) => {
        if (data.schemaVersion !== 1 || !Array.isArray(data.documents)) throw new Error('schema');
        setDocuments(data.documents);
        setLoading(false);
      })
      .catch((e) => {
        if (e.name !== 'AbortError') {
          setLoading(false);
          setError(true);
        }
      });
    return () => controller.abort();
  }, [indexUrl, attempt]);
  const update = (next: SearchState) => {
    if (catalog || next.filters.exampleType.length)
      next = { ...next, filters: { ...next.filters, contentType: ['ukazky'] } };
    const params = serializeSearchState(next);
    history.pushState(null, '', `${location.pathname}${params.size ? `?${params}` : ''}`);
    setState(next);
    setDraft(next.filters);
    setQuery(next.q);
    setWarnings([]);
    setShareStatus('');
    setShareFallback('');
  };
  const results = useMemo(() => searchDocuments(documents, state), [documents, state]);
  const pageCount = Math.max(1, Math.ceil(results.length / 20));
  const page = Math.min(state.page, pageCount);
  useEffect(() => {
    if (!loading && !error && state.page > pageCount) {
      const next = { ...state, page: pageCount };
      history.replaceState(null, '', `${location.pathname}?${serializeSearchState(next)}`);
      setState(next);
      setWarnings((previous) => [
        ...previous,
        'Zvolená stránka není dostupná; zobrazujeme poslední stránku výsledků.',
      ]);
    }
  }, [loading, error, pageCount, state]);
  const hasCriteriaFilters =
    filterKeys.some((key) => key !== 'contentType' && state.filters[key].length) ||
    (state.filters.contentType.length > 0 && !catalog);
  const hasRequest = Boolean(state.q) || hasCriteriaFilters || catalog;
  const dirty = JSON.stringify(draft) !== JSON.stringify(state.filters);
  const filterCount = filterKeys.reduce(
    (n, key) => n + (catalog && key === 'contentType' ? 0 : state.filters[key].length),
    0,
  );
  const toggle = (key: FilterKey, value: string) =>
    setDraft((current) => {
      const next = {
        ...current,
        [key]: current[key].includes(value)
          ? current[key].filter((v) => v !== value)
          : [...current[key], value],
      };
      if (key === 'exampleType' && next.exampleType.length) next.contentType = ['ukazky'];
      if (key === 'contentType' && next.contentType.includes('kriteria')) next.exampleType = [];
      return next;
    });
  const groups: FilterKey[] = catalog
    ? ['area', 'phase', 'topic', 'exampleType', 'subject', 'school', 'age']
    : ['area', 'phase', 'topic', 'contentType', 'exampleType'];
  async function share() {
    const url = new URL(location.href);
    url.search = serializeSearchState(state).toString();
    try {
      await navigator.clipboard.writeText(url.href);
      setShareStatus('Odkaz zkopírován');
    } catch {
      setShareFallback(url.href);
      setShareStatus('Označený odkaz můžete zkopírovat.');
    }
  }
  const resetFilters = () =>
    update({
      ...state,
      page: 1,
      filters: { ...emptyFilters(), contentType: catalog ? ['ukazky'] : [] },
    });
  return (
    <div className="search-app">
      <form
        role="search"
        className="search-box"
        onSubmit={(event) => {
          event.preventDefault();
          update({ ...state, q: query.trim().slice(0, 240), page: 1 });
        }}
      >
        <label htmlFor="search-query">
          {catalog ? 'Hledat v ukázkách' : 'Co ve výuce řešíte?'}
        </label>
        <div className="search-input-row">
          <Search size={23} aria-hidden="true" />
          <input
            id="search-query"
            type="search"
            name="q"
            maxLength={240}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              catalog ? 'Téma, předmět nebo název ukázky' : 'Např. žáci se nezapojují nebo 4.2.2'
            }
          />
          <button className="button" type="submit">
            Hledat <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </form>
      {warnings.length > 0 && (
        <div className="notice back-link" role="status">
          {warnings.join(' ')}
        </div>
      )}
      {filterCount > 0 && (
        <div className="active-filters" aria-label="Použité filtry">
          {filterKeys.flatMap((key) =>
            state.filters[key]
              .filter(() => !(catalog && key === 'contentType'))
              .map((value) => (
                <button
                  key={`${key}-${value}`}
                  className="tag"
                  onClick={() =>
                    update({
                      ...state,
                      page: 1,
                      filters: {
                        ...state.filters,
                        [key]: state.filters[key].filter((v) => v !== value),
                      },
                    })
                  }
                  aria-label={`Odstranit filtr ${options[key].find((o) => o.value === value)?.label ?? value}`}
                >
                  {options[key].find((o) => o.value === value)?.label ?? value}
                  <X size={13} aria-hidden="true" />
                </button>
              )),
          )}
          <button onClick={resetFilters}>Vymazat filtry</button>
        </div>
      )}
      <div className="search-layout">
        <details
          className="filter-panel"
          open={filtersOpen}
          onToggle={(e) => setFiltersOpen(e.currentTarget.open)}
        >
          <summary>
            <SlidersHorizontal size={19} aria-hidden="true" />
            Filtry{filterCount > 0 ? ` (${filterCount})` : ''}
            <ChevronDown className="filter-caret" size={18} aria-hidden="true" />
          </summary>
          <div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                update({ ...state, filters: draft, page: 1 });
              }}
            >
              {groups
                .filter((key) => options[key].length)
                .map((key) => (
                  <fieldset key={key}>
                    <legend>{groupLabels[key]}</legend>
                    {options[key].map((option) => (
                      <label key={option.value} className="filter-option">
                        <input
                          type="checkbox"
                          name={parameterNames[key]}
                          value={option.value}
                          checked={draft[key].includes(option.value)}
                          onChange={() => toggle(key, option.value)}
                        />
                        <span>{option.label}</span>
                        <span className="facet-count">
                          {loading
                            ? '–'
                            : facetCount(
                                documents,
                                { ...state, filters: draft },
                                key,
                                option.value,
                              )}
                        </span>
                      </label>
                    ))}
                  </fieldset>
                ))}
              {draft.exampleType.length > 0 && <p className="small">Typ obsahu: Ukázky</p>}
              {dirty && (
                <p className="filter-dirty" role="status">
                  Filtry čekají na potvrzení.
                </p>
              )}
              <button className="button" type="submit">
                Použít filtry
              </button>
              <button type="button" className="filter-clear" onClick={resetFilters}>
                Vymazat filtry
              </button>
            </form>
          </div>
        </details>
        <section aria-label="Výsledky hledání">
          {loading ? (
            <p role="status">Připravuji vyhledávání…</p>
          ) : error ? (
            <div className="search-error" role="alert">
              <h2>Vyhledávání se nepodařilo načíst</h2>
              <p>Zkuste to znovu nebo přejděte do přehledu rámce.</p>
              <button className="button secondary" onClick={() => setAttempt((n) => n + 1)}>
                Zkusit znovu
              </button>{' '}
              <a href={frameworkUrl}>Prozkoumat rámec</a>
            </div>
          ) : !hasRequest ? (
            <div className="search-suggestions">
              <h2>Začněte situací z výuky</h2>
              <p className="small">Redakční náměty pro prototyp · k metodickému ověření</p>
              <div className="situation-list">
                {suggestions.map((s) => (
                  <a
                    key={s.title}
                    href={s.url}
                    onClick={(e) => {
                      e.preventDefault();
                      update({ ...state, q: s.title, page: 1 });
                    }}
                  >
                    {s.title}
                    <ArrowRight size={18} aria-hidden="true" />
                  </a>
                ))}
              </div>
              <p className="small back-link">
                Znáte oblast? <a href={frameworkUrl}>Prozkoumejte strukturu rámce.</a>
              </p>
            </div>
          ) : (
            <>
              <div className="search-results-header">
                <h2 role="status" aria-live="polite">
                  {results.length}{' '}
                  {results.length === 1
                    ? 'výsledek'
                    : results.length > 1 && results.length < 5
                      ? 'výsledky'
                      : 'výsledků'}
                  {state.q ? ` pro „${state.q}“` : ''}
                </h2>
                <span className="small">
                  {state.q ? 'Podle relevance' : 'Podle pořadí v rámci'}
                </span>
                <div className="share-control">
                  <button
                    className="icon-button"
                    onClick={share}
                    title="Kopírovat hledání"
                    aria-label="Kopírovat odkaz na hledání"
                  >
                    <Link size={20} />
                  </button>
                  <span className="small" aria-live="polite">
                    {shareStatus}
                  </span>
                  {shareFallback && (
                    <input
                      readOnly
                      value={shareFallback}
                      aria-label="Odkaz na hledání"
                      onFocus={(e) => e.currentTarget.select()}
                      autoFocus
                    />
                  )}
                </div>
              </div>
              {results.length === 0 ? (
                <div className="empty-state">
                  <h2>Nenašli jsme odpovídající obsah</h2>
                  <p>
                    {state.q
                      ? `Pro dotaz „${state.q}“ a zvolené filtry není žádný výsledek.`
                      : 'Této kombinaci filtrů zatím neodpovídá žádný obsah.'}{' '}
                    Zkuste kratší výraz nebo odstraňte některý filtr.
                  </p>
                  {filterCount > 0 && (
                    <button className="button secondary" onClick={resetFilters}>
                      Zrušit filtry a zachovat dotaz
                    </button>
                  )}
                  <p className="back-link">
                    <a href={frameworkUrl}>Prozkoumat rámec</a>
                    <button
                      className="filter-clear"
                      onClick={() =>
                        update({
                          ...initialState,
                          filters: { ...emptyFilters(), contentType: catalog ? ['ukazky'] : [] },
                        })
                      }
                    >
                      Vymazat vše
                    </button>
                  </p>
                </div>
              ) : (
                <>
                  {results.slice((page - 1) * 20, page * 20).map(({ doc, reason }) => (
                    <article className="search-result" key={doc.id}>
                      <p className="result-context">
                        {doc.type === 'kriteria' ? 'Kritérium' : 'Autorská modelová ukázka'} ·{' '}
                        {doc.context}
                      </p>
                      <a className="result-title" href={doc.url}>
                        {doc.code && <span className="code">{doc.code}</span>}
                        <div>
                          <h3>{doc.title}</h3>
                        </div>
                        <ArrowRight size={20} aria-hidden="true" />
                      </a>
                      <p className="result-excerpt">{doc.excerpt}</p>
                      <p className="result-reason">
                        <Info size={14} aria-hidden="true" />
                        {reason}
                      </p>
                    </article>
                  ))}
                  {pageCount > 1 && (
                    <nav className="pagination" aria-label="Stránkování výsledků">
                      <button
                        disabled={page === 1}
                        onClick={() => update({ ...state, page: page - 1 })}
                        aria-label="Předchozí stránka"
                      >
                        <ArrowLeft size={17} />
                      </button>
                      {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                        <button
                          key={n}
                          onClick={() => update({ ...state, page: n })}
                          aria-current={n === page ? 'page' : undefined}
                          aria-label={`Stránka ${n}`}
                        >
                          {n}
                        </button>
                      ))}
                      <button
                        disabled={page === pageCount}
                        onClick={() => update({ ...state, page: page + 1 })}
                        aria-label="Další stránka"
                      >
                        <ArrowRight size={17} />
                      </button>
                    </nav>
                  )}
                </>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
