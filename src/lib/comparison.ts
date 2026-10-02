export interface ComparisonState {
  mode: 'all' | 'pair';
  pair: [number, number];
  target: number | null;
  differences: boolean;
}
export const defaultComparison = (): ComparisonState => ({
  mode: 'all',
  pair: [1, 2],
  target: null,
  differences: false,
});
export function parseComparison(
  params: URLSearchParams,
  hasComment: (a: number, b: number) => boolean,
) {
  const state = defaultComparison();
  let warning = '';
  const rawPair = params.get('porovnat');
  if (rawPair !== null) {
    if (/^[0-3],[0-3]$/.test(rawPair)) {
      const [a, b] = rawPair.split(',').map(Number);
      if (a !== b) {
        state.mode = 'pair';
        state.pair = [Math.min(a, b), Math.max(a, b)];
        state.differences = params.get('rozdily') === '1' && hasComment(...state.pair);
      } else warning = 'Porovnání vyžaduje dvě různé úrovně. Zobrazujeme všechny čtyři.';
    } else warning = 'Odkaz obsahuje neplatnou dvojici. Zobrazujeme všechny čtyři úrovně.';
  } else if (params.has('uroven')) {
    const raw = params.get('uroven')!;
    if (/^[0-3]$/.test(raw)) state.target = Number(raw);
    else warning = 'Tato úroveň není dostupná. Zobrazujeme všechny čtyři.';
  }
  return { state, warning };
}
export function comparisonParams(state: ComparisonState) {
  const params = new URLSearchParams();
  if (state.mode === 'pair') {
    params.set('porovnat', [...state.pair].sort((a, b) => a - b).join(','));
    if (state.differences) params.set('rozdily', '1');
  } else if (state.target !== null) params.set('uroven', String(state.target));
  return params;
}
