// Beginner-friendly: clickable world image -> map click to lat/lon -> fetch weather
document.addEventListener('DOMContentLoaded', () => {
  const apiKeyInput = document.getElementById('apiKey');
  const saveBtn = document.getElementById('saveKey');
  const locateBtn = document.getElementById('locate');
  const placeEl = document.getElementById('place');
  const weatherEl = document.getElementById('weather');
  const worldImg = document.getElementById('worldMap');
  const marker = document.getElementById('marker');

  const STORAGE_KEY = 'owm_api_key_v1';
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) apiKeyInput.value = saved;

  saveBtn.addEventListener('click', () => {
    const v = apiKeyInput.value.trim();
    if (!v) { alert('Please paste your OpenWeatherMap API key.'); return; }
    localStorage.setItem(STORAGE_KEY, v);
    alert('API key saved to localStorage.');
  });

  function setMarkerPos(x, y) {
    marker.style.left = x + 'px';
    marker.style.top = y + 'px';
    marker.style.display = 'block';
  }

  function clearWeather() {
    placeEl.textContent = 'No location selected';
    weatherEl.innerHTML = '<p class="muted">Click the map to fetch weather data.</p>';
    marker.style.display = 'none';
  }

  function imgToLatLon(clientX, clientY) {
    const rect = worldImg.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const w = rect.width;
    const h = rect.height;
    // Equirectangular: lon from x, lat from y
    const lon = (x / w) * 360 - 180;
    const lat = 90 - (y / h) * 180;
    return {lat, lon, px: x, py: y};
  }

  async function fetchWeather(lat, lon) {
    const key = localStorage.getItem(STORAGE_KEY) || apiKeyInput.value.trim();
    if (!key) { weatherEl.innerHTML = '<p class="muted">No API key provided.</p>'; return; }
    placeEl.textContent = `Lat ${lat.toFixed(4)}, Lon ${lon.toFixed(4)}`;
    weatherEl.innerHTML = '<p class="muted">Loading…</p>';
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${encodeURIComponent(key)}&units=metric`;
      const resp = await fetch(url);
      if (!resp.ok) {
        const txt = await resp.text();
        throw new Error(resp.status + ' ' + txt);
      }
      const data = await resp.json();
      renderWeather(data);
    } catch (err) {
      weatherEl.innerHTML = `<p class="muted">Error: ${escapeHtml(err.message)}</p>`;
    }
  }

  function renderWeather(data) {
    const c = data.main && typeof data.main.temp === 'number' ? data.main.temp : NaN;
    const f = (c * 9/5) + 32;
    const desc = data.weather && data.weather[0] ? data.weather[0].description : '';
    const humidity = data.main && data.main.humidity ? data.main.humidity : '—';
    const wind = data.wind && data.wind.speed ? data.wind.speed : '—';
    weatherEl.innerHTML = `
      <div class="weather-row"><div class="temp">${isNaN(c) ? '—' : c.toFixed(1)+'°C'}</div><div class="temp">${isNaN(c) ? '—' : f.toFixed(1)+'°F'}</div></div>
      <div class="small">${escapeHtml(desc || '')}</div>
      <div class="small">Humidity: ${humidity}% • Wind: ${wind} m/s</div>
    `;
  }

  function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

  // Click on image
  worldImg.addEventListener('click', (ev) => {
    const {lat, lon, px, py} = imgToLatLon(ev.clientX, ev.clientY);
    setMarkerPos(px, py);
    fetchWeather(lat, lon);
  });

  // Use geolocation: get coords and map to image pixel position
  locateBtn.addEventListener('click', () => {
    if (!navigator.geolocation) { alert('Geolocation not supported.'); return; }
    navigator.geolocation.getCurrentPosition(pos => {
      const lat = pos.coords.latitude, lon = pos.coords.longitude;
      // compute pixel
      const rect = worldImg.getBoundingClientRect();
      const x = ((lon + 180) / 360) * rect.width;
      const y = ((90 - lat) / 180) * rect.height;
      setMarkerPos(x, y);
      fetchWeather(lat, lon);
    }, err => alert('Geolocation error: '+err.message));
  });

  // start
  clearWeather();
});

