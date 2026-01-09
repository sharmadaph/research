const form = document.getElementById('addForm');
const cityName = document.getElementById('cityName');
const tzValue = document.getElementById('tzValue');
const tzMode = document.getElementById('tzMode');
const citiesEl = document.getElementById('cities');
const chipButtons = document.querySelectorAll('.chip');

let cities = [];
const STORAGE_KEY = 'world_clock_cities_v1';

function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(cities)); }
function load(){ try{ cities = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }catch{ cities = []; } }

// Parse offset expressions like: UTC+2, 2h30m, +330m, -5
function parseOffsetExpression(expr){
  if(!expr) return null;
  let s = String(expr).trim().toLowerCase();
  // remove leading utc/gmt
  s = s.replace(/^utc|^gmt/,'');
  s = s.replace(/\s+/g,'');
  // Match tokens like +2h, -30m, 90 (hours), +330m
  const tokenRe = /([+-]?)(\d+(?:\.\d+)?)(h|m|s)?/g;
  let match; let totalMs = 0; let any=false;
  while((match = tokenRe.exec(s)) !== null){
    any = true;
    const sign = match[1] === '-' ? -1 : 1;
    const num = parseFloat(match[2]);
    const unit = match[3] || 'h';
    if(unit === 'h') totalMs += sign * num * 3600_000;
    else if(unit === 'm') totalMs += sign * num * 60_000;
    else if(unit === 's') totalMs += sign * num * 1000;
  }
  if(!any) return null;
  return totalMs;
}

function formatTimeFromDate(date){
  const hh = String(date.getHours()).padStart(2,'0');
  const mm = String(date.getMinutes()).padStart(2,'0');
  const ss = String(date.getSeconds()).padStart(2,'0');
  return `${hh}:${mm}:${ss}`;
}

function timeForEntry(entry){
  if(entry.mode === 'iana'){
    try{
      const opts = {hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false,timeZone: entry.value};
      return new Intl.DateTimeFormat('en-US', opts).format(new Date());
    }catch(e){ return 'Invalid TZ'; }
  }
  // offset
  const ms = parseOffsetExpression(entry.value);
  if(ms === null) return 'Invalid offset';
  const now = Date.now();
  const d = new Date(now + ms);
  return formatTimeFromDate(d);
}

function render(){
  citiesEl.innerHTML = '';
  cities.forEach((c)=>{
    const li = document.createElement('li'); li.className = 'city';
    const checkbox = document.createElement('input'); checkbox.type='checkbox'; checkbox.checked = !!c.show; checkbox.title='Show/hide';
    checkbox.addEventListener('change', ()=>{ c.show = checkbox.checked; save(); render(); });

    const meta = document.createElement('div'); meta.className = 'meta';
    const title = document.createElement('div'); title.className='title'; title.textContent = c.label;
    const tz = document.createElement('div'); tz.className='tz'; tz.textContent = `${c.mode === 'iana' ? 'IANA: ' + c.value : 'Offset: ' + c.value}`;
    meta.appendChild(title); meta.appendChild(tz);

    const time = document.createElement('div'); time.className='time'; time.textContent = timeForEntry(c);

    const actions = document.createElement('div'); actions.className='actions';
    const del = document.createElement('button'); del.className='btn small'; del.textContent='Delete';
    del.addEventListener('click', ()=>{ cities = cities.filter(x=>x.id !== c.id); save(); render(); });
    const edit = document.createElement('button'); edit.className='btn small'; edit.textContent='Edit';
    edit.addEventListener('click', ()=>{ cityName.value = c.label; tzValue.value = c.value; tzMode.value = c.mode; cities = cities.filter(x=>x.id !== c.id); save(); render(); cityName.focus(); });
    actions.appendChild(edit); actions.appendChild(del);

    li.appendChild(checkbox); li.appendChild(meta); li.appendChild(time); li.appendChild(actions);
    citiesEl.appendChild(li);
  });
}

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const label = cityName.value.trim();
  const val = tzValue.value.trim();
  if(!label || !val) return;
  let mode = tzMode.value;
  // auto-detect if user entered a known IANA tz
  if(mode === 'auto'){
    // simple heuristic: contains '/' then treat as IANA
    if(val.includes('/')) mode = 'iana'; else mode = 'offset';
  }
  const entry = { id: Date.now() + Math.random(), label, mode, value: val, show:true };
  cities.push(entry);
  save(); render(); cityName.value=''; tzValue.value=''; tzMode.value='auto'; cityName.focus();
});

chipButtons.forEach(b=> b.addEventListener('click', ()=>{ tzValue.value = b.dataset.val; tzMode.value = b.dataset.val.includes('/') ? 'iana' : 'offset'; }));

// Initialize with sensible defaults if empty
load();
if(cities.length === 0){
  cities = [
    {id:1,label:'London',mode:'iana',value:'Europe/London',show:true},
    {id:2,label:'New York',mode:'iana',value:'America/New_York',show:true},
    {id:3,label:'Tokyo',mode:'iana',value:'Asia/Tokyo',show:true},
    {id:4,label:'Custom +2',mode:'offset',value:'UTC+2',show:true}
  ];
}

// Update loop
function tick(){
  // update times in place
  const times = document.querySelectorAll('.city .time');
  // but easiest is re-rendering
  render();
}

render();
setInterval(tick, 1000);
