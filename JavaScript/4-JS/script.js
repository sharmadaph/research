document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const username = document.getElementById('username');
  const password = document.getElementById('password');
  const errorEl = document.getElementById('error-message');
  const welcomeEl = document.getElementById('welcome-message');

  function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

  function clear(){ errorEl.textContent=''; welcomeEl.textContent=''; errorEl.style.display='none'; welcomeEl.style.display='none'; }

  function validate(){
    const u = username.value.trim();
    const p = password.value || '';
    if(!u) return {valid:false,message:'Please enter a username.'};
    if(p.length===0) return {valid:false,message:'Please enter a password.'};
    // simple rule: password must be exactly "333"
    if(p !== '333') return {valid:false,message:'Incorrect password.'};
    return {valid:true,username:u};
  }

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    clear();
    const res = validate();
    if(!res.valid){ errorEl.textContent = res.message; errorEl.style.display='block'; return; }
    welcomeEl.innerHTML = `Welcome, <strong>${escapeHtml(res.username)}</strong>!`;
    welcomeEl.style.display = 'block';
    form.reset();
  });
});
