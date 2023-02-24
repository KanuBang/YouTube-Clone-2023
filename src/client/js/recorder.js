const startBtn = document.getElementById("startBtn")
const video = document.getElementById("preview")
let stream; // 녹화 스트림 변수
let recorder; // 레코더 변수
let videoFile; // 비디오 파일 변수

const handleDownload= () => {
    // 다운로드 버튼이 클릭되면 웹켐 스트림 녹화 파일이 다운로드 된다.
    // a태그를 생성하고 href으로 다운로드할 녹화 파일의 URL을 설정한다.
    // .download로 이름까지 설정하고
    // document에 삽입한다.
    // 마지막으로 click이벤트를 설정하며 파일을 다운로드 시킨다. 
    const a = document.createElement("a") 
    a.href = videoFile
    a.download = "MyRecording.webm" 
    document.body.appendChild(a); 
    a.click() 

    /*
    다운로드 버튼을 클릭하면 다운로드 a 태그가 자동으로 틀릭되어 녹화 파일이 다운로드 된다.
    */
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
       audio: false,
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