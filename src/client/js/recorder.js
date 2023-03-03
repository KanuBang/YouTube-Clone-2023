import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
const startBtn = document.getElementById("startBtn")
const video = document.getElementById("preview")
let stream; // 녹화 스트림 변수
let recorder; // 레코더 변수
let videoFile; // 비디오 파일 변수

const handleDownload= async () => {
   
    const ffmpeg = createFFmpeg({
      log:true
    });

    await ffmpeg.load()
    ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile))
    await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");

    await ffmpeg.run("-i", "recording.webm", "-ss", "00:00:01", "-frames:v", "1", "thumbnail.jpg")
    
    const mp4File = ffmpeg.FS("readFile", "output.mp4")
    const thumbFile = ffmpeg.FS("readFile", "thumbnail.jpg");
    
    const mp4Blob = new Blob([mp4File.buffer], {type:"video/mp4"})
    const thumbBlob = new Blob([thumbFile.buffer], {type: "image/jpg"})
    const mp4Url = URL.createObjectURL(mp4Blob)
    const thumbUrl = URL.createObjectURL(thumbBlob)

    const a = document.createElement("a") 
    a.href = mp4Url
    a.download = "MyRecording.mp4" 
    document.body.appendChild(a); 
    a.click() 

    const thumbA = document.createElement("a");
    thumbA.href = thumbUrl
    thumbA.download = "MyThumnail.jpg"
    document.body.appendChild(thumbA)
    thumbA.click()

    ffmpeg.FS("unlink", "recording.webm")
    ffmpeg.FS("unlink", "output.mp4");
    ffmpeg.FS("unlink", "thumbnail.jpg");

    URL.revokeObjectURL(mp4Url)
    URL.revokeObjectURL(thumbUrl)
    URL.revokeObjectURL(videoFile)
}

const handleStop = () => {
    //stop Recording을 누르면 버튼의 txt가 download recording으로 바뀐다.
    startBtn.innerText = "Download Recording"
    startBtn.removeEventListener("click", handleStop)
    startBtn.addEventListener("click", handleDownload)
    //버튼 클릭 시 발생하는 이벤트도 handleDownload로 바뀐다.
    recorder.stop() 
    // 녹화를 중지하면 최종적으로 ondataavailable 이벤트가 실행되고
    // 녹화한 영상이 생서된다.
} 

const handleStart = async( ) => {
  startBtn.innerText = "Stop Recording" //start Recording txt가 stop Recording txt로 바뀐다.
  startBtn.removeEventListener("click", handleStart)
  startBtn.addEventListener("click", handleStop) // 버튼 클릭 시 발생하는 이벤트도 handleStop으로 바뀐다.
  recorder = new MediaRecorder(stream, {mimeType:"video/webm"})
  // MediaRecorder 객체는 스트림에 캡쳐된 비디오나 오디오를 녹화하기 위해 사용된다.
  // 여기서는 웹캠 비디오 스트림을 녹화하기 위헤 사용되었다.
  recorder.ondataavailable = (event) => {
    // recorder.stop()시 최종적으로 호출되어 녹화 영상이 만들어진다.
    videoFile = URL.createObjectURL(event.data)
    // 웹캠 스트림을 녹화한 파일을 URL로 변환한다.
    video.srcObject = null
    video.src = videoFile
    // URL로 변환된 웹켑 스트림 녹화 파일을 video.src에 넣는다.
    video.loop = true
    video.play()
    // 녹화된 파일을 무한 반복 재생한다.
  }
  recorder.start()
  // 레코더가 녹화를 시작하면
  // ondataavailable 이벤트가 주기적으로 호출된다.
  // recorder.stop()으로 레코더가 멈출때 최종적으로 ondataavailable이 실행된다.

}

const init = async () => {
    stream = await navigator.mediaDevices.getUserMedia({
       audio: true,
       video: true, 
    }) 
    //"비디오 스트림 생성" 
    //브라우저가 제공하는 다양한 기능 중 미디어 장치를 이용하여 비디오 스트림을 얻겠다는 말.

    video.srcObject = stream
    video.play()
    // video.srcObject으로 비디오 스트림을 로딩하고
    // 그 비디오 스트림을 실시간으로 출력한다.
}

init()
startBtn.addEventListener("click", handleStart)
// 녹화 시작 버튼을  틀릭하면 handleStart가 시작된다.