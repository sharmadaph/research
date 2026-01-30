(function(){
  const indicator = document.getElementById('network-indicator');
  if(!indicator) return;

  function updateState(){
    const online = navigator.onLine;
    indicator.classList.remove('online','offline');
    indicator.classList.add(online ? 'online' : 'offline');
    indicator.setAttribute('aria-label', online ? 'Online' : 'Offline');
    indicator.title = online ? 'Online' : 'Offline';
  }

  // initial state
  updateState();

  // listen for changes
  window.addEventListener('online', updateState);
  window.addEventListener('offline', updateState);
})();
