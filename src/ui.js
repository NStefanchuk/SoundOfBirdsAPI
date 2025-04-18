export function renderImage(url) {
  const img = document.getElementById('birdImage')
  img.src = url
  img.style.display = 'block'
  if (url.includes('unknownBird')) {
    img.classList.add('unknown-bird')
  } else {
    img.classList.remove('unknown-bird')
  }
}

export function renderAudioList(recordings) {
  const section = document.getElementById('audioSection')
  section.innerHTML = ''

  if (!recordings.length) {
    section.innerHTML = `<p>No recordings found.</p>`
    return
  }

  recordings.slice(0, 3).forEach((rec) => {
    const audio = document.createElement('audio')
    audio.controls = true
    audio.preload = 'metadata'
    audio.src = rec.file.startsWith('http') ? rec.file : 'https:' + rec.file

    const div = document.createElement('div')
    div.className = 'audio-card'
    const title = document.createElement('h2')
    title.textContent = `${rec.en || 'No name'} (${rec.cnt || 'Location unknown'})`

    div.appendChild(title)
    div.appendChild(audio)
    section.appendChild(div)
  })
}

export function showError(message) {
  const section = document.getElementById('audioSection')
  section.innerHTML = `<p>${message}</p>`
}
