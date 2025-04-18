import { fetchBirdImage, fetchBirdSounds } from './api.js'
import { setupAutocomplete } from './hint.js'
import { renderImage, renderAudioList, showError } from './ui.js'

setupAutocomplete()

const form = document.getElementById('searchForm')
const spinner = document.getElementById('spinner')

form.addEventListener('submit', async (e) => {
  e.preventDefault() 
  const query = document.getElementById('birdInput').value.trim()
  if (!query) return

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
    const recordings = await fetchBirdSounds(query)
    renderAudioList(recordings)
  } catch {
    showError('Failed to fetch bird sounds. Try again later.')
  }

  spinner.style.display = 'none'
})
