import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
const actionBtn = document.getElementById("actionBtn")
const video = document.getElementById("preview")
let stream; // 녹화 스트림 변수
let recorder; // 레코더 변수
let videoFile; // 비디오 파일 변수

const files = {
  input: "recording.webm",
  output: "output.mp4",
  thumb: "thumbnail.jpg"
}

const downloadFile = (fileUrl, fileName) => {
  const a = document.createElement("a")
  a.href = fileUrl
  a.download = fileName
  document.body.appendChild(a)
  a.click()
}

const handleDownload= async () => {

    actionBtn.removeEventListener("click", handleDownload)
    actionBtn.innerText = "TransCoding...";
    actionBtn.disabled = true;

    const ffmpeg = createFFmpeg({
      log:true
    });

    await ffmpeg.load()
    ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile))
    await ffmpeg.run("-i", files.input, "-r", "60", files.output);
    await ffmpeg.run("-i", files.input, "-ss", "00:00:01", "-frames:v", "1", files.thumb)
    
    const mp4File = ffmpeg.FS("readFile", files.output)
    const thumbFile = ffmpeg.FS("readFile", files.thumb);
    
    const mp4Blob = new Blob([mp4File.buffer], {type:"video/mp4"})
    const thumbBlob = new Blob([thumbFile.buffer], {type: "image/jpg"})
    const mp4Url = URL.createObjectURL(mp4Blob)
    const thumbUrl = URL.createObjectURL(thumbBlob)

    downloadFile(mp4Url, "MyRecording.mp4")
    downloadFile(thumbUrl, "MyThumbnail.jpg")

    ffmpeg.FS("unlink", files.input)
    ffmpeg.FS("unlink", files.output);
    ffmpeg.FS("unlink", files.thumb);

    URL.revokeObjectURL(mp4Url)
    URL.revokeObjectURL(thumbUrl)
    URL.revokeObjectURL(videoFile)

    actionBtn.disabled = false;
    actionBtn.innerText = "Record Again"
    actionBtn.addEventListener("click", handleStart)

}

const handleStop = () => {
    //stop Recording을 누르면 버튼의 txt가 download recording으로 바뀐다.
    actionBtn.innerText = "Download Recording"
    actionBtn.removeEventListener("click", handleStop)
    actionBtn.addEventListener("click", handleDownload)
    //버튼 클릭 시 발생하는 이벤트도 handleDownload로 바뀐다.
    recorder.stop() 
    // 녹화를 중지하면 최종적으로 ondataavailable 이벤트가 실행되고
    // 녹화한 영상이 생서된다.
} 

const handleStart = async( ) => {
  actionBtn.innerText = "Stop Recording" //start Recording txt가 stop Recording txt로 바뀐다.
  actionBtn.removeEventListener("click", handleStart)
  actionBtn.addEventListener("click", handleStop) // 버튼 클릭 시 발생하는 이벤트도 handleStop으로 바뀐다.
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
actionBtn.addEventListener("click", handleStart)
// 녹화 시작 버튼을  틀릭하면 handleStart가 시작된다.