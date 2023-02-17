const video = document.querySelector("video")
const playBtn = document.getElementById("play")
const muteBtn = document.getElementById("mute")
const time = document.getElementById("time")
const volumeRange = document.getElementById("volume")
const currentTime = document.getElementById("currentTime")
const totalTime = document.getElementById("totalTime")

let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = (e) => {
    if(video.paused) {
        video.play()
    } else {
        video.pause()
    }

    playBtn.innerText = video.paused ? "Play" : "Pause";
}

const handleMuteClick = (e) => {
    if(video.muted) {
        video.muted = false;
    } else {
        video.muted = true;
    }
    muteBtn.innerText = video.muted ? "Unmute": "Mute";
    volumeRange.value = video.muted ? 0 : volumeValue;
}

const handleVolumeChange = (event) => {
    const {
        target: {value},
    } = event

    if(video.muted) {
        video.muted = false
        muteBtn.innerText = "Mute"
    }

    volumeValue = value
    video.volume = value
}

const formatTime = (seconds) => {
    return new Date (seconds * 1000).toISOString().substring(14, 19);
}

const handleLoadedMetaData = () => {
    totalTime.innerText = formatTime(Math.floor(video.duration))
}

const handleTimeUpdate = () => {
    currentTime.innerText = formatTime(Math.floor(video.currentTime))
}

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetaData)
video.addEventListener("timeupdate", handleTimeUpdate)