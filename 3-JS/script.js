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
    if (password.length < 6) return { valid: false, message: 'Password must be at least 6 characters.' };
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
    if (!result.valid) { showError(result.message); return; }
    showWelcome(result.username);
    form.reset();
  });
});
