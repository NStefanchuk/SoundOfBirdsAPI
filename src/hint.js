import { popularBirds } from './birdsList.js'
import { regions } from './regionsList.js';

export function setupAutocomplete() {
  const input = document.getElementById('birdInput')
  const suggestionsBox = document.getElementById('suggestions')

  function showSuggestions(query = '') {
    suggestionsBox.innerHTML = ''

    let matches
    if (query === '') {
      matches = popularBirds.sort(() => Math.random() - 0.5).slice(0, 10)
    } else {
      matches = popularBirds
        .filter(bird => bird.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 10)
    }

    matches.forEach(bird => {
      const div = document.createElement('div')
      div.textContent = bird
      div.addEventListener('click', () => {
        input.value = bird
        suggestionsBox.innerHTML = ''
        suggestionsBox.style.display = 'none'
      })
      suggestionsBox.appendChild(div)
    })

    suggestionsBox.style.display = matches.length ? 'block' : 'none'
  }

  input.addEventListener('focus', () => showSuggestions())
  input.addEventListener('input', () => showSuggestions(input.value))

  document.addEventListener('click', (e) => {
    if (!suggestionsBox.contains(e.target) && e.target !== input) {
      suggestionsBox.innerHTML = ''
      suggestionsBox.style.display = 'none'
    }
  })
}

export function showRegionHint(inputValue) {
  const suggestionsBox = document.getElementById('regionSuggestions');
  suggestionsBox.innerHTML = '';

  let matches;

  if (!inputValue.trim()) {
    // Показ 10 случайных регионов, если поле пустое
    matches = regions.sort(() => 0.5 - Math.random()).slice(0, 10);
  } else {
    matches = regions
      .filter(region =>
        region.toLowerCase().includes(inputValue.toLowerCase())
      )
      .slice(0, 7);
  }

  if (matches.length === 0) {
    suggestionsBox.style.display = 'none';
    return;
  }

  matches.forEach(region => {
    const div = document.createElement('div');
    div.className = 'suggestion-item';
    div.textContent = region;
    div.onclick = () => {
      document.getElementById('regionInput').value = region;
      suggestionsBox.style.display = 'none';
    };
    suggestionsBox.appendChild(div);
  });

  suggestionsBox.style.display = 'block';

  // Закрытие списка регионов при клике вне
document.addEventListener('click', (e) => {
  const regionSuggestions = document.getElementById('regionSuggestions');
  const regionInput = document.getElementById('regionInput');
  if (!regionSuggestions.contains(e.target) && e.target !== regionInput) {
    regionSuggestions.style.display = 'none';
  }
});
}


