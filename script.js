import { pauseOtherAudio } from './helper.js'
import { setupAutocomplete } from './hint.js'

const searchForm = document.getElementById('searchForm')
const birdImage = document.getElementById('birdImage')
const audioSection = document.getElementById('audioSection')
const spinner = document.querySelector('.spinner')

setupAutocomplete()

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const query = document.getElementById('birdInput').value.trim()
  if (!query) return

  birdImage.style.display = 'none'
  birdImage.src = ''
  audioSection.innerHTML = ''

  // Pixabay API
  const pixabayKey = '49700645-d4f374e519be8f295f4111793'
  try {
    const imgRes = await fetch(
      `https://pixabay.com/api/?key=${pixabayKey}&q=${encodeURIComponent(
        query
      )}&image_type=photo&safesearch=true`
    )
    const imgData = await imgRes.json()
    if (imgData.hits.length > 0) {
      birdImage.src = imgData.hits[0].webformatURL
      birdImage.style.display = 'block'
    } else {
      birdImage.src = './unknownBird.svg'
      birdImage.style.display = 'block'
    }
  } catch (err) {
    console.error('Error fetching image:', err)
  }

  // Xeno-Canto API
  try {
    spinner.style.display = 'block'
    const soundRes = await fetch(
      `https://xeno-canto.org/api/2/recordings?query=${encodeURIComponent(
        query
      )}`
    )

    const soundData = await soundRes.json()
    if (soundData.recordings.length > 0) {
      audioSection.innerHTML = ''
      soundData.recordings.slice(0, 3).forEach((rec, index) => {
        const audio = document.createElement('audio')
        audio.controls = true
        audio.addEventListener('error', () => {
          const errorMsg = document.createElement('p')
          errorMsg.textContent = `Failed to load audio for "${rec.en || query}"`
          audioSection.appendChild(errorMsg)
        })

        audio.addEventListener('play', () => pauseOtherAudio(audio))
        audio.src = rec.file.startsWith('http') ? rec.file : 'https:' + rec.file
        audio.preload = 'metadata'
        audio.setAttribute('controlsList', 'nodownload')

        const div = document.createElement('div')
        div.className = 'audio-card'
        const title = document.createElement('h2')
        title.textContent = `${rec.en || query} (${rec.cnt || 'Unknown'})`

        div.appendChild(title)
        div.appendChild(audio)
        audioSection.appendChild(div)
      })
    } else {
      audioSection.innerHTML = `<p>No recordings found.</p>`
    }
  } catch (err) {
    console.error('Error fetching audio:', err)
    audioSection.innerHTML = `<p>Failed to fetch bird sounds. Try again later.</p>`
  } finally {
    spinner.style.display = 'none'
  }
})
