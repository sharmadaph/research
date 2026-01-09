const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const minInput = document.getElementById('minMinutes');
const maxInput = document.getElementById('maxMinutes');
const targetInput = document.getElementById('targetMinutes');
const timeDisplay = document.getElementById('timeDisplay');
const elapsedDisplay = document.getElementById('elapsed');
const targetDisplay = document.getElementById('target');
const allowedDisplay = document.getElementById('allowed');
const progressBar = document.getElementById('progressBar');
const message = document.getElementById('message');

let timer = null;
let startTime = null;
let pausedAt = null;
let elapsedMs = 0;
let running = false;

function msToTime(ms){
  const totalSec = Math.floor(ms/1000);
  const mm = String(Math.floor(totalSec/60)).padStart(2,'0');
  const ss = String(totalSec % 60).padStart(2,'0');
  return `${mm}:${ss}`;
}

function updateMeta(){
  const target = Number(targetInput.value) || 0;
  const min = Number(minInput.value) || 0;
  const max = Number(maxInput.value) || 0;
  targetDisplay.textContent = `${target}:00`;
  allowedDisplay.textContent = `${min} — ${max}`;
}

function setMessage(text, isError=false){
  message.textContent = text || '';
  message.style.color = isError ? 'var(--danger)' : '';
}

function updateUI(){
  const nowElapsed = running ? (Date.now() - startTime + elapsedMs) : elapsedMs;
  timeDisplay.textContent = msToTime(nowElapsed);
  elapsedDisplay.textContent = msToTime(nowElapsed);

  const targetMin = Math.max(1, Number(targetInput.value) || 0);
  const min = Math.max(1, Number(minInput.value) || targetMin);
  const max = Math.max(min, Number(maxInput.value) || targetMin);

  // progress based on target (0..100%) but visually let bar exceed 100 when over target up to max
  const pct = Math.min(100, (nowElapsed / (targetMin*60*1000)) * 100);
  progressBar.style.width = pct + '%';

  // check rules
  if(nowElapsed >= min*60*1000){
    setMessage('Minimum reached — session eligible for completion', false);
  } else {
    setMessage('');
  }
  if(nowElapsed >= max*60*1000){
    setMessage('Maximum exceeded — consider stopping or taking a break', true);
  }
}

function tick(){ updateUI(); }

startBtn.addEventListener('click', ()=>{
  if(!running){
    startTime = Date.now();
    running = true;
    startBtn.textContent = 'Running';
    timer = setInterval(tick, 250);
  }
});

pauseBtn.addEventListener('click', ()=>{
  if(running){
    // pause
    clearInterval(timer);
    elapsedMs += Date.now() - startTime;
    running = false;
    startBtn.textContent = 'Start';
  } else {
    // resume
    startTime = Date.now();
    running = true;
    timer = setInterval(tick, 250);
    startBtn.textContent = 'Running';
  }
});

resetBtn.addEventListener('click', ()=>{
  clearInterval(timer);
  startTime = null; pausedAt = null; elapsedMs = 0; running = false;
  startBtn.textContent = 'Start'; progressBar.style.width = '0%'; setMessage(''); updateUI();
});

// update metadata when inputs change
[minInput, maxInput, targetInput].forEach(i=> i.addEventListener('input', ()=>{ updateMeta(); updateUI(); }));

// initialize
updateMeta(); updateUI();
