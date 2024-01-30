import { useEffect, useRef } from "react";
import "./App.css";

function App() {
  const videoElement = useRef(null);
  const videoBackgroundElement = useRef(null);
  const canvasElement = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      videoElement.current.srcObject = stream;
      videoBackgroundElement.current.srcObject = stream;
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
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: "20px",
        textAlign: "center",
      }}
    >
      <div style={{ position: "relative" }}>
        <div>
          <video
            ref={videoElement}
            width="450"
            height="400"
            autoPlay
            style={{
              objectFit: "initial",
              bottom: "50px",
              position: "relative",
              filter: "blur(4px)",
            }}
          ></video>
        </div>
        <div
          style={{
            position: "absolute",
            left: "0px",
            right: "0px",
            top: "10px",
          }}
        >
          <video
            ref={videoBackgroundElement}
            width="300"
            height="300"
            autoPlay
            style={{ objectFit: "initial" }}
          ></video>
        </div>
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
