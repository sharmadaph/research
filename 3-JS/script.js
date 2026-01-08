document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const errorEl = document.getElementById('error-message');
  const welcomeEl = document.getElementById('welcome-message');

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (s) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#39;'}[s]));
  }

  function clearMessages() {
    errorEl.textContent = '';
    welcomeEl.textContent = '';
    errorEl.style.display = 'none';
    welcomeEl.style.display = 'none';
  }

  function validate() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value || '';
    if (!username) return { valid: false, message: 'Please enter a username.' };
    if (password !== '333') return { valid: false, message: 'Incorrect password.' };
    return { valid: true, username };
  }

  function showError(message) {
    errorEl.textContent = message;
    errorEl.style.display = 'block';
    welcomeEl.style.display = 'none';
  }

  function showWelcome(username) {
    welcomeEl.innerHTML = `Welcome, <strong>${escapeHtml(username)}</strong>!`;
    welcomeEl.style.display = 'block';
    errorEl.style.display = 'none';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearMessages();
    const result = validate();
    const attempt = { username: usernameInput.value.trim(), time: new Date().toISOString(), success: result.valid };
    saveAttempt(attempt);
    if (!result.valid) { showError(result.message); renderLogs(); return; }
    showWelcome(result.username);
    renderLogs();
    form.reset();
  });
 
  // Logging functions
  const STORAGE_KEY = 'loginAttempts_v1';

  function loadAttempts() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }

  function saveAttempt(attempt) {
    const arr = loadAttempts();
    arr.unshift(attempt);
    // optional: keep last 200 attempts
    if (arr.length > 200) arr.length = 200;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  }

  function renderLogs() {
    const section = document.getElementById('logs-section');
    const list = document.getElementById('logs-list');
    const attempts = loadAttempts();
    list.innerHTML = '';
    if (!attempts.length) {
      const li = document.createElement('li');
      li.textContent = 'No attempts yet.';
      list.appendChild(li);
      return;
    }
    attempts.forEach(a => {
      const li = document.createElement('li');
      const left = document.createElement('div');
      left.innerHTML = `<span class="user">${escapeHtml(a.username || '(empty)')}</span> <small style="color:#6b7280">${new Date(a.time).toLocaleString()}</small>`;
      const right = document.createElement('div');
      const status = document.createElement('span');
      status.className = 'status ' + (a.success ? 'success' : 'fail');
      status.textContent = a.success ? 'SUCCESS' : 'FAIL';
      right.appendChild(status);
      li.appendChild(left);
      li.appendChild(right);
      list.appendChild(li);
    });
  }

  function clearLogs() {
    localStorage.removeItem(STORAGE_KEY);
    renderLogs();
  }

  // Wire up log controls
  const viewBtn = document.getElementById('view-logs-btn');
  const clearBtn = document.getElementById('clear-logs-btn');
  const logsSection = document.getElementById('logs-section');
  viewBtn.addEventListener('click', () => {
    const shown = logsSection.style.display === 'block';
    logsSection.style.display = shown ? 'none' : 'block';
    if (!shown) renderLogs();
  });
  clearBtn.addEventListener('click', () => {
    if (confirm('Clear all stored login attempts?')) clearLogs();
  });
});
