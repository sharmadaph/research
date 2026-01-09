// Simple map-based weather lookup using OpenWeatherMap (requires API key)
document.addEventListener('DOMContentLoaded', () => {
  const apiKeyInput = document.getElementById('apiKey');
  const saveBtn = document.getElementById('saveKey');
  const locateBtn = document.getElementById('locate');
  const placeEl = document.getElementById('place');
  const weatherEl = document.getElementById('weather');

  const STORAGE_KEY = 'owm_api_key_v1';
  const apiKeySaved = localStorage.getItem(STORAGE_KEY);
  if (apiKeySaved) apiKeyInput.value = apiKeySaved;

  saveBtn.addEventListener('click', () => {
    const v = apiKeyInput.value.trim();
    if (!v) { alert('Please paste your OpenWeatherMap API key.'); return; }
    localStorage.setItem(STORAGE_KEY, v);
    alert('API key saved to localStorage.');
  });

  // Initialize Leaflet map
  const map = L.map('map').setView([20,0], 2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  let marker = null;
  function setMarker(lat, lon) {
    if (marker) marker.setLatLng([lat, lon]);
    else marker = L.marker([lat, lon]).addTo(map);
  }

  async function fetchWeather(lat, lon) {
    const key = localStorage.getItem(STORAGE_KEY) || apiKeyInput.value.trim();
    if (!key) { weatherEl.innerHTML = '<p class="muted">No API key provided.</p>'; return; }
    placeEl.textContent = `Lat ${lat.toFixed(4)}, Lon ${lon.toFixed(4)}`;
    weatherEl.innerHTML = '<p class="muted">Loading…</p>';
    try {
      // Use OpenWeatherMap current weather API
      const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${encodeURIComponent(key)}&units=metric`);
      if (!resp.ok) throw new Error('Failed to fetch weather');
      const data = await resp.json();
      renderWeather(data);
    } catch (err) {
      weatherEl.innerHTML = `<p class="muted">Error: ${err.message}</p>`;
    }
  }

  function renderWeather(data) {
    const c = data.main.temp;
    const f = (c * 9/5) + 32;
    const desc = data.weather && data.weather[0] ? data.weather[0].description : '';
    const humidity = data.main.humidity;
    const wind = data.wind && data.wind.speed ? data.wind.speed : null;
    weatherEl.innerHTML = `
      <div class="weather-row"><div class="temp">${c.toFixed(1)}°C</div><div class="temp">${f.toFixed(1)}°F</div></div>
      <div class="small">${escapeHtml(desc || '')}</div>
      <div class="small">Humidity: ${humidity}% ${wind ? '• Wind: '+wind+' m/s' : ''}</div>
      <div style="margin-top:8px"><a href="https://openweathermap.org/city/${data.id}" target="_blank">View on OpenWeatherMap</a></div>
    `;
  }

  function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

  map.on('click', (e) => {
    const {lat, lng} = e.latlng;
    setMarker(lat, lng);
    fetchWeather(lat, lng);
  });

  locateBtn.addEventListener('click', () => {
    if (!navigator.geolocation) { alert('Geolocation not supported.'); return; }
    navigator.geolocation.getCurrentPosition(p => {
      const lat = p.coords.latitude, lon = p.coords.longitude;
      map.setView([lat, lon], 10);
      setMarker(lat, lon);
      fetchWeather(lat, lon);
    }, err => alert('Geolocation error: '+err.message));
  });
});
