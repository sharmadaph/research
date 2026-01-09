const form = document.getElementById('addForm');
const taskText = document.getElementById('taskText');
const ruleType = document.getElementById('ruleType');
const ruleValue = document.getElementById('ruleValue');
const tasksEl = document.getElementById('tasks');

let tasks = [];

function save(){
  localStorage.setItem('todo_rules_tasks', JSON.stringify(tasks));
}

function load(){
  try{ tasks = JSON.parse(localStorage.getItem('todo_rules_tasks')) || []; }catch{ tasks = []; }
}

function render(){
  tasksEl.innerHTML = '';
  tasks.forEach(t => {
    const li = document.createElement('li');
    li.className = 'task';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!t.completed;
    checkbox.addEventListener('change', ()=>{ t.completed = checkbox.checked; save(); render(); });

    const meta = document.createElement('div');
    meta.className = 'meta';
    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = t.text;
    const rule = document.createElement('div');
    rule.className = 'rule';
    rule.textContent = t.rule && t.rule.type !== 'none' ? `${t.rule.type}${t.rule.value ? ': ' + t.rule.value : ''}` : 'No rule';

    meta.appendChild(title);
    meta.appendChild(rule);

    const actions = document.createElement('div');
    actions.className = 'actions';

    const edit = document.createElement('button'); edit.className = 'btn small'; edit.textContent = 'Edit';
    edit.addEventListener('click', ()=>{ taskText.value = t.text; ruleType.value = t.rule?.type || 'none'; ruleValue.value = t.rule?.value || ''; // remove old and add new on submit
      tasks = tasks.filter(x=>x.id !== t.id); save(); render(); taskText.focus();
    });

    const del = document.createElement('button'); del.className = 'btn small danger'; del.textContent = 'Delete';
    del.addEventListener('click', ()=>{ tasks = tasks.filter(x=>x.id !== t.id); save(); render(); });

    actions.appendChild(edit);
    actions.appendChild(del);

    li.appendChild(checkbox);
    li.appendChild(meta);
    li.appendChild(actions);
    tasksEl.appendChild(li);
  });
}

function countWords(s){ return s.trim() === '' ? 0 : s.trim().split(/\s+/).length; }
function countDigits(s){ return (s.match(/\d/g) || []).length; }

function evaluateRule(task){
  const type = task.rule?.type || 'none';
  const value = task.rule?.value || '';
  const text = task.text || '';
  if(type === 'none') return false;
  if(type === 'contains') return text.toLowerCase().includes(String(value).toLowerCase());
  if(type === 'regex'){
    try{ const re = new RegExp(value); return re.test(text); }catch{ return false; }
  }
  if(type === 'words_gt'){
    const n = parseInt(value,10); if(isNaN(n)) return false; return countWords(text) > n;
  }
  if(type === 'expression'){
    const words = countWords(text);
    const length = text.length;
    const digits = countDigits(text);
    let expr = String(value || '');
    if(!expr) return false;
    expr = expr.replace(/\bwords\b/g, String(words)).replace(/\blength\b/g, String(length)).replace(/\bdigits\b/g, String(digits));
    if(!/^[0-9\s()+\-*/%.<>!=&|]+$/.test(expr)) return false;
    try{ return Boolean(new Function('return ('+expr+')')()); }catch{ return false; }
  }
  return false;
}

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const text = taskText.value.trim();
  if(!text) return;
  const rule = { type: ruleType.value, value: ruleValue.value.trim() };
  const id = Date.now() + Math.random();
  const task = { id, text, completed: false, rule };
  task.completed = evaluateRule(task);
  tasks.unshift(task);
  save(); render();
  taskText.value = ''; ruleType.value = 'none'; ruleValue.value = ''; taskText.focus();
});

// Load and initialize
load();
tasks.forEach(t=>{ t.completed = evaluateRule(t); });
render();
