import { useEffect, useRef } from "react";
import "./App.css";

function App() {
  const videoElement = useRef(null);
  const canvasElement = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      videoElement.current.srcObject = stream;
    };
    startCamera();
  }, []);

  const capturePhoto = () => {
    canvasElement.current
      .getContext("2d")
      .drawImage(
        videoElement.current,
        0,
        0,
        canvasElement.current.width,
        canvasElement.current.height
      );
    const imageURL = canvasElement.current.toDataURL("image/jpeg");
    console.log(imageURL);
  };

  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div>
        <video ref={videoElement} width="320" height="300" autoPlay></video>
      </div>
      <div>
        <button id="click-photo" onClick={capturePhoto}>
          Capture
        </button>
      </div>
      <div>
        <canvas ref={canvasElement} width="320" height="240"></canvas>
      </div>
    </div>
  );
}

export default App;
