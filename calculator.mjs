export class Calculator {
  value = '0';
  stored = null;
  operator = null;
  fresh = false;
  expression = '';

  clear() { this.value = '0'; this.stored = null; this.operator = null; this.fresh = false; this.expression = ''; }
  digit(digit) {
    if (this.fresh || this.value === 'Hata') { this.value = '0'; this.fresh = false; }
    if (digit === '.') { if (!this.value.includes('.')) this.value += '.'; return; }
    if (this.value.replace(/[-.]/g, '').length >= 14) return;
    this.value = this.value === '0' ? digit : this.value + digit;
  }
  sign() { if (this.value !== 'Hata' && Number(this.value) !== 0) this.value = this.value.startsWith('-') ? this.value.slice(1) : '-' + this.value; }
  percent() { if (this.value !== 'Hata') this.setValue(Number(this.value) / 100); }
  backspace() { if (this.fresh || this.value === 'Hata') return; this.value = this.value.slice(0, -1); if (!this.value || this.value === '-') this.value = '0'; }
  setValue(number) { this.value = Number.isFinite(number) ? String(Number(number.toPrecision(12))) : 'Hata'; }
  choose(operator) {
    if (this.value === 'Hata') return;
    if (this.operator && !this.fresh) this.equals();
    if (this.value === 'Hata') return;
    this.stored = Number(this.value); this.operator = operator; this.fresh = true;
    this.expression = `${this.value} ${operator}`;
  }
  equals() {
    if (!this.operator || this.value === 'Hata') return;
    const a = this.stored, b = Number(this.value), op = this.operator;
    this.expression = `${a} ${op} ${b} =`;
    this.setValue(op === '+' ? a + b : op === '-' ? a - b : op === '*' ? a * b : b === 0 ? NaN : a / b);
    this.stored = null; this.operator = null; this.fresh = true;
  }
}
