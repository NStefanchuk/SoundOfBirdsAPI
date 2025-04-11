export const pauseOtherAudio = (selectedTrack) => {

  const audioList = document.querySelectorAll('audio')
  console.log(audioList)
  audioList.forEach((track, index) => {
    if (selectedTrack == index) {
      track.play()
      console.log(index)
    } else {
      track.pause()
      console.log(index);
    }
  })
}
