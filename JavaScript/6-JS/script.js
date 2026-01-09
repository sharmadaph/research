const input = document.getElementById('expr');
const resultEl = document.getElementById('result');
const msg = document.getElementById('message');

function setResult(text, isError){
  resultEl.textContent = text;
  msg.textContent = isError ? text : '';
  msg.className = isError ? 'info error' : 'info';
}

function evaluateExpression(raw){
  const trimmed = raw.trim();
  if(trimmed === '') return null;
  // Replace ^ with ** for exponent (user-friendly)
  const replaced = trimmed.replace(/\^/g, '**');

  // Allow only digits, operators, parentheses, decimals, spaces, and exponent operator
  // This blocks letters and function calls for safety.
  if(!/^[0-9+\-*/%().\s*]+$/.test(replaced)){
    throw new Error('Invalid characters detected. Only digits and + - * / % ( ) . ^ are allowed.');
  }

  // Evaluate using Function in a minimal scope
  const fn = new Function('return (' + replaced + ')');
  const v = fn();
  if(typeof v === 'number' && Number.isFinite(v)) return v;
  throw new Error('Expression did not evaluate to a finite number.');
}

function update(){
  const expr = input.value;
  if(expr.trim() === ''){ setResult('—', false); return; }
  try{
    const val = evaluateExpression(expr);
    setResult(String(val), false);
  }catch(err){
    setResult(err.message, true);
  }
}

input.addEventListener('input', update);
input.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter') e.preventDefault();
});

// Example chips
document.querySelectorAll('.chip').forEach(c=>{
  c.addEventListener('click', ()=>{ input.value = c.dataset.ex; update(); input.focus(); });
});
