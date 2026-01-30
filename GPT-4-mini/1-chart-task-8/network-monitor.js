// Create a circle element in the settings panel
const settingsPanel = document.querySelector('.settings-panel');
const networkCircle = document.createElement('div');
networkCircle.classList.add('network');
settingsPanel.appendChild(networkCircle);

// Function to update network status
function updateNetworkStatus() {
  if (navigator.onLine) {
    networkCircle.classList.remove('offline');
    networkCircle.classList.add('online');
  } else {
    networkCircle.classList.remove('online');
    networkCircle.classList.add('offline');
  }
}

// Add event listeners for network changes
window.addEventListener('online', updateNetworkStatus);
window.addEventListener('offline', updateNetworkStatus);

// Initialize the network status
updateNetworkStatus();