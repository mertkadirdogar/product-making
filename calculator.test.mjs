import test from 'node:test';
import assert from 'node:assert/strict';
import { Calculator } from './calculator.mjs';
function calculation(a, op, b) { const c = new Calculator(); for (const d of a) c.digit(d); c.choose(op); for (const d of b) c.digit(d); c.equals(); return c; }
test('four operations and decimal precision', () => {
  for (const [a, op, b, expected] of [['12','+','8','20'],['9','-','12','-3'],['7','*','6','42'],['9','/','4','2.25'],['0.1','+','0.2','0.3']]) assert.equal(calculation(a,op,b).value,expected);
});
test('division by zero and recovery', () => { const c = calculation('2','/','0'); assert.equal(c.value,'Hata'); c.digit('5'); assert.equal(c.value,'5'); });
test('chaining operations uses immediate execution', () => { const c = calculation('2','+','3'); c.choose('*'); c.digit('4'); c.equals(); assert.equal(c.value,'20'); });
test('replacing pending operator', () => { const c = new Calculator(); c.digit('8'); c.choose('+'); c.choose('-'); c.digit('3'); c.equals(); assert.equal(c.value,'5'); });
test('editing, sign, percentage and clear', () => { const c = new Calculator(); c.digit('5'); c.digit('0'); c.sign(); c.percent(); assert.equal(c.value,'-0.5'); c.clear(); c.digit('1'); c.digit('.'); c.digit('.'); c.digit('2'); c.backspace(); assert.equal(c.value,'1.'); c.clear(); assert.equal(c.value,'0'); assert.equal(c.operator,null); });
