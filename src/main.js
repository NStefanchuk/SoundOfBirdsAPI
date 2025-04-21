import { fetchBirdImage, fetchBirdSounds } from './api.js'
import { setupAutocomplete, showRegionHint } from './hint.js'
import { renderImage, renderAudioList, showError } from './ui.js'

document.addEventListener('DOMContentLoaded', () => {
  setupAutocomplete()

  document.getElementById('regionInput').addEventListener('input', (e) => {
    showRegionHint(e.target.value)
  })

  regionInput.addEventListener('focus', () => {
    showRegionHint(''); // Показать рандомные, если фокус без ввода
  });

  const form = document.getElementById('searchForm')
  const spinner = document.getElementById('spinner')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const query = document.getElementById('birdInput').value.trim()
    const region = document.getElementById('regionInput').value.trim()
    if (!query) return
    
    document.getElementById('regionSuggestions').style.display = 'none';
    document.getElementById('suggestions').style.display = 'none';
    

    spinner.style.display = 'block'
    document.getElementById('birdImage').style.display = 'none'
    document.getElementById('audioSection').innerHTML = ''

    try {
      const imageUrl = await fetchBirdImage(query)
      renderImage(imageUrl)
    } catch {
      renderImage('./public/unknownBird.png')
    }

    try {
      const recordings = await fetchBirdSounds(query, region)
      renderAudioList(recordings)
    } catch {
      showError('Failed to fetch bird sounds. Try again later.')
    }

    spinner.style.display = 'none'
  })
})
