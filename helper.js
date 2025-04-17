export const pauseOtherAudio = (playingAudio) => {
  const audioList = document.querySelectorAll('audio')

  audioList.forEach((track) => {
    if (track !== playingAudio && !track.paused) {
      track.pause()
    }
  })
}
