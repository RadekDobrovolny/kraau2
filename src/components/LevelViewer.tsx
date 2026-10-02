import { useEffect, useState } from 'react';
import { Link, Printer } from 'lucide-react';
import {
  comparisonParams,
  defaultComparison,
  parseComparison,
  type ComparisonState,
} from '../lib/comparison';
import type { CriterionRevision, Transition } from '../lib/schema';
interface Props {
  levels: CriterionRevision['levels'];
  transitions: Transition[];
  url: string;
}

function highlightedText(text: string, phrases: { phrase: string; occurrence: number }[]) {
  const ranges = phrases
    .flatMap(({ phrase, occurrence }) => {
      let start = -1,
        offset = 0;
      for (let i = 0; i <= occurrence; i++) {
        start = text.indexOf(phrase, offset);
        if (start < 0) return [];
        offset = start + phrase.length;
      }
      return [{ start, end: start + phrase.length }];
    })
    .sort((a, b) => a.start - b.start);
  const parts: React.ReactNode[] = [];
  let cursor = 0;
  for (const range of ranges) {
    if (range.start < cursor) continue;
    parts.push(text.slice(cursor, range.start));
    parts.push(<mark key={range.start}>{text.slice(range.start, range.end)}</mark>);
    cursor = range.end;
  }
  parts.push(text.slice(cursor));
  return parts;
}

export default function LevelViewer({ levels, transitions, url }: Props) {
  const [state, setState] = useState<ComparisonState>(defaultComparison);
  const [message, setMessage] = useState('');
  const [shareStatus, setShareStatus] = useState('');
  const [fallback, setFallback] = useState('');
  const findTransition = (a: number, b: number) =>
    transitions.find((t) => t.fromLevel === Math.min(a, b) && t.toLevel === Math.max(a, b));
  useEffect(() => {
    const restore = () => {
      const parsed = parseComparison(new URLSearchParams(location.search), (a, b) =>
        Boolean(findTransition(a, b)),
      );
      if (!location.search && /^#uroven-[0-3]$/.test(location.hash))
        parsed.state.target = Number(location.hash.slice(-1));
      setState(parsed.state);
      setMessage(parsed.warning);
    };
    restore();
    window.addEventListener('popstate', restore);
    return () => window.removeEventListener('popstate', restore);
  }, [transitions]);
  const change = (next: ComparisonState) => {
    next = {
      ...next,
      pair: [Math.min(...next.pair), Math.max(...next.pair)],
    };
    const params = comparisonParams(next);
    history.pushState(null, '', `${url}${params.size ? `?${params}` : ''}#urovne`);
    setState(next);
    setMessage(
      next.mode === 'pair'
        ? `Porovnáváte úrovně ${[...next.pair].sort().join(' a ')}.`
        : 'Zobrazeny všechny čtyři úrovně.',
    );
    setShareStatus('');
    setFallback('');
  };
  const transition = state.mode === 'pair' ? findTransition(...state.pair) : undefined;
  const setLevel = (index: 0 | 1, value: number) => {
    if (state.pair[index === 0 ? 1 : 0] === value) {
      setMessage('Vyberte dvě různé úrovně. Shodnou dvojici nelze porovnat.');
      return;
    }
    const pair: [number, number] = [...state.pair];
    pair[index] = value;
    change({ ...state, pair, differences: state.differences && Boolean(findTransition(...pair)) });
  };
  async function share() {
    const target = new URL(url, location.origin);
    target.search = comparisonParams(state).toString();
    if (state.mode === 'pair' || state.target !== null) target.hash = 'urovne';
    try {
      await navigator.clipboard.writeText(target.href);
      setShareStatus('Odkaz zkopírován');
    } catch {
      setFallback(target.href);
      setShareStatus('Označený odkaz můžete zkopírovat.');
    }
  }
  return (
    <section className="levels-section" id="urovne" aria-labelledby="levels-title">
      <h2 id="levels-title">Jak může profesní jednání vypadat</h2>
      <div className="levels-toolbar" data-js-only>
        <div className="segmented" aria-label="Zobrazení úrovní">
          <button
            type="button"
            aria-pressed={state.mode === 'all'}
            onClick={() => change(defaultComparison())}
          >
            Všechny úrovně
          </button>
          <button
            type="button"
            aria-pressed={state.mode === 'pair'}
            onClick={() => change({ ...state, mode: 'pair', target: null })}
          >
            Porovnat dvě úrovně
          </button>
        </div>
        <div className="share-control">
          <button
            className="icon-button"
            onClick={share}
            title="Kopírovat toto zobrazení"
            aria-label="Kopírovat odkaz na toto zobrazení úrovní"
          >
            <Link size={20} aria-hidden="true" />
          </button>
          <button
            className="icon-button print-button"
            title="Vytisknout kritérium"
            aria-label="Vytisknout kritérium"
            onClick={() => window.print()}
          >
            <Printer size={20} aria-hidden="true" />
          </button>
          <span className="small" aria-live="polite">
            {shareStatus}
          </span>
          {fallback && (
            <input
              readOnly
              value={fallback}
              aria-label="Odkaz na zobrazení úrovní"
              onFocus={(e) => e.currentTarget.select()}
              autoFocus
            />
          )}
        </div>
      </div>
      {state.mode === 'pair' && (
        <div className="comparison-choices">
          <label>
            První úroveň
            <select
              value={state.pair[0]}
              onChange={(e) => setLevel(0, Number(e.target.value))}
              aria-label="První úroveň"
            >
              {[0, 1, 2, 3].map((n) => (
                <option key={n} value={n}>
                  Úroveň {n}
                </option>
              ))}
            </select>
          </label>
          <label>
            Druhá úroveň
            <select
              value={state.pair[1]}
              onChange={(e) => setLevel(1, Number(e.target.value))}
              aria-label="Druhá úroveň"
            >
              {[0, 1, 2, 3].map((n) => (
                <option key={n} value={n}>
                  Úroveň {n}
                </option>
              ))}
            </select>
          </label>
          <label className="differences-toggle">
            <input
              type="checkbox"
              checked={state.differences}
              disabled={!transition}
              onChange={(e) => change({ ...state, differences: e.target.checked })}
            />
            Zvýraznit podstatné rozdíly
          </label>
        </div>
      )}
      <div className={`levels-grid ${state.mode === 'pair' ? 'pair' : ''}`}>
        {levels.map((descriptor) => (
          <article
            key={descriptor.id}
            id={`uroven-${descriptor.level}`}
            className={`level-card ${state.target === descriptor.level ? 'targeted' : ''}`}
            data-level={descriptor.level}
            style={
              state.mode === 'pair' && !state.pair.includes(descriptor.level)
                ? { display: 'none' }
                : undefined
            }
          >
            <header>
              <a
                href={`${url}?uroven=${descriptor.level}#urovne`}
                aria-label={`Odkaz na úroveň ${descriptor.level}`}
              >
                Úroveň <strong>{descriptor.level}</strong>
              </a>
              {state.target === descriptor.level && <small>Zobrazená úroveň</small>}
            </header>
            <p>
              {state.differences && transition
                ? highlightedText(
                    descriptor.text,
                    transition.highlights.filter((h) => h.descriptorId === descriptor.id),
                  )
                : descriptor.text}
            </p>
          </article>
        ))}
      </div>
      <p className="level-status" role="status" aria-live="polite">
        {message}
      </p>
      {state.mode === 'pair' &&
        (transition ? (
          <aside className="transition-comment">
            <p className="eyebrow">
              {transition.status === 'demo'
                ? 'Pracovní návrh metodického komentáře · k ověření'
                : 'Metodický komentář'}
            </p>
            <h3>Co se mezi těmito popisy mění</h3>
            <ul>
              {transition.summaryPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <p>
              <strong>Čeho si všimnout:</strong> {transition.observationQuestion}
            </p>
          </aside>
        ) : (
          <p className="small">Pro tuto dvojici není zpracovaný metodický komentář.</p>
        ))}
    </section>
  );
}
