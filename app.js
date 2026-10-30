import { Calculator } from './calculator.mjs';
const calculator = new Calculator();
const display = document.querySelector('#display');
const expression = document.querySelector('#expression');
function render() {
  display.textContent = calculator.value.replace('.', ',');
  expression.textContent = calculator.value === 'Hata' ? 'Geçersiz işlem · AC ile temizleyin' : calculator.expression.replaceAll('*', '×').replaceAll('/', '÷') || 'İşlem yapmaya başlayın';
}
document.querySelector('.keys').addEventListener('click', ({ target }) => {
  const button = target.closest('button');
  if (!button) return;
  if (button.dataset.digit !== undefined) calculator.digit(button.dataset.digit);
  else if (button.dataset.operator) calculator.choose(button.dataset.operator);
  else calculator[button.dataset.action]();
  render();
});
document.addEventListener('keydown', event => {
  if (event.ctrlKey || event.metaKey || event.altKey || event.target.matches('input,textarea,select,[contenteditable="true"]')) return;
  const key = event.key;
  if (/^[0-9]$/.test(key)) calculator.digit(key);
  else if (key === '.' || key === ',') calculator.digit('.');
  else if (['+', '-', '*', '/'].includes(key)) calculator.choose(key);
  else if (key === '=' || key === 'Enter') calculator.equals();
  else if (key === 'Escape' || key === 'Delete') calculator.clear();
  else if (key === 'Backspace') calculator.backspace();
  else if (key === '%') calculator.percent();
  else return;
  event.preventDefault(); render();
});
