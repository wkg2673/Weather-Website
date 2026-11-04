const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const output = document.getElementById('weather-output');
const errorEl = document.getElementById('error');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

let isDark = true;

async function getWeather(city) {
  const res = await fetch(`https://wttr.in/${encodeURIComponent(city)}`);
  if (!res.ok) throw new Error('City not found');
  const html = await res.text();
  const match = html.match(/<div class="term-container">([\s\S]*?)<\/div>/);
  if (!match) throw new Error('Could not parse weather data');
  return match[1];
}

function showWeather(html) {
  output.innerHTML = html.replace(/^[^\S\n]+(?=[┌├└┐┤┘┬┴┼┘│─╒╓╕╖╘╙╛╜╞╟╡╢╠╣═║])/gm, '');
  output.classList.remove('hidden');
  errorEl.classList.add('hidden');
}

function showError(msg) {
  errorEl.textContent = msg;
  errorEl.classList.remove('hidden');
  output.classList.add('hidden');
}

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;

  try {
    const html = await getWeather(city);
    showWeather(html);
  } catch {
    showError('Could not find weather for that city.');
  }
  cityInput.value = '';
});
