document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const welcomeMessage = document.getElementById('welcome-message');
    welcomeMessage.innerHTML = `Welcome, <strong>${username}</strong>!`;
});