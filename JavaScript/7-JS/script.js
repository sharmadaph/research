const input = document.getElementById('textInput');
const preview = document.getElementById('preview');
const charCount = document.getElementById('charCount');
const wordCount = document.getElementById('wordCount');
const digitCount = document.getElementById('digitCount');
const upper = document.getElementById('upper');
const lower = document.getElementById('lower');
const reversed = document.getElementById('reversed');
const clearBtn = document.getElementById('clearBtn');
const copyBtn = document.getElementById('copyBtn');

function updateAll(text){
  const t = text || '';
  preview.textContent = t === '' ? '—' : t;
  charCount.textContent = t.length;
  const words = t.trim() === '' ? [] : t.trim().split(/\s+/);
  wordCount.textContent = words.length;
  const digits = (t.match(/\d/g) || []).length;
  digitCount.textContent = digits;
  upper.textContent = t.toUpperCase() || '—';
  lower.textContent = t.toLowerCase() || '—';
  reversed.textContent = t.split('').reverse().join('') || '—';
}

input.addEventListener('input', (e)=>{
  updateAll(e.target.value);
});

clearBtn.addEventListener('click', ()=>{
  input.value = '';
  updateAll('');
  input.focus();
});

copyBtn.addEventListener('click', async ()=>{
  try{
    await navigator.clipboard.writeText(preview.textContent || '');
    copyBtn.textContent = 'Copied!';
    setTimeout(()=> copyBtn.textContent = 'Copy Preview', 1200);
  }catch{
    copyBtn.textContent = 'Copy failed';
    setTimeout(()=> copyBtn.textContent = 'Copy Preview', 1200);
  }
});

// Initialize
updateAll('');
