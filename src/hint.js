import { popularBirds } from './birdsList.js'

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
