import test from 'node:test';
import assert from 'node:assert/strict';
import { comparisonParams, parseComparison } from '../src/lib/comparison';
test('valid pair wins over a target level and normalizes order', () => {
  const result = parseComparison(
    new URLSearchParams('porovnat=3,1&uroven=2&rozdily=1'),
    () => true,
  );
  assert.equal(result.state.mode, 'pair');
  assert.deepEqual(result.state.pair, [1, 3]);
  assert.equal(result.state.target, null);
  assert.equal(comparisonParams(result.state).get('porovnat'), '1,3');
});
test('equal and malformed pairs fall back to all levels with explanation', () => {
  for (const value of ['1,1', '-1,2', '0,4', '1.0,2', 'x,2', '1,2,3', '']) {
    const result = parseComparison(
      new URLSearchParams({ porovnat: value, uroven: '2' }),
      () => true,
    );
    assert.equal(result.state.mode, 'all');
    assert.equal(result.state.target, null);
    assert(result.warning);
  }
});
test('all four target levels remain available', () => {
  for (let n = 0; n <= 3; n++)
    assert.equal(
      parseComparison(new URLSearchParams({ uroven: String(n) }), () => false).state.target,
      n,
    );
});
test('differences require an available comment and valid pair', () => {
  assert.equal(
    parseComparison(new URLSearchParams('porovnat=0,3&rozdily=1'), () => false).state.differences,
    false,
  );
  assert.equal(
    parseComparison(new URLSearchParams('rozdily=1'), () => true).state.differences,
    false,
  );
});
