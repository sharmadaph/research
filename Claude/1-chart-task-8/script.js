// Network monitoring functionality
class NetworkMonitor {
    constructor() {
        this.networkElement = document.querySelector('.network');
        this.statusText = document.getElementById('status-text');
        this.init();
    }

    init() {
        // Set initial state
        this.updateNetworkStatus();
        
        // Listen for network events
        window.addEventListener('online', () => this.setOnline());
        window.addEventListener('offline', () => this.setOffline());
        
        // Periodic check (every 5 seconds) as fallback
        setInterval(() => this.updateNetworkStatus(), 5000);
    }

    updateNetworkStatus() {
        if (navigator.onLine) {
            this.setOnline();
        } else {
            this.setOffline();
        }
    }

    setOnline() {
        this.networkElement.classList.remove('offline');
        this.networkElement.classList.add('online');
        this.statusText.textContent = 'Online';
        this.statusText.style.color = '#22c55e';
    }

    setOffline() {
        this.networkElement.classList.remove('online');
        this.networkElement.classList.add('offline');
        this.statusText.textContent = 'Offline';
        this.statusText.style.color = '#ef4444';
    }
}

// Initialize the network monitor when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new NetworkMonitor();
});
