import { fetchBirdImage, fetchBirdSounds } from './api.js'
import { showHint } from './hint.js'
import { renderImage, renderAudioList, showError } from './ui.js'
import { popularBirds } from './birdsList.js'
import { regions } from './regionsList.js';

document.addEventListener('DOMContentLoaded', () => {

  showHint('birdInput', 'suggestions', popularBirds)
  showHint('regionInput', 'regionSuggestions', regions)

  const form = document.getElementById('searchForm')
  const spinner = document.getElementById('spinner')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    spinner.style.display = 'block'
    const query = document.getElementById('birdInput').value.trim()
    const region = document.getElementById('regionInput').value.trim()

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
