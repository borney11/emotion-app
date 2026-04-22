import Navbar from "../components/Navbar";
import { useEffect, useRef, useState } from "react";

export default function Detect() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [emotion, setEmotion] = useState("...");
  const [confidence, setConfidence] = useState(0);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      captureFrame();
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const captureFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || video.videoWidth === 0) return;

    const ctx = canvas.getContext("2d");
    canvas.width = 320;
    canvas.height = 240;

    ctx.drawImage(video, 0, 0, 320, 240);

    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("file", blob);

      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      setEmotion(data.emotion);
      setConfidence(data.confidence);
    }, "image/jpeg");
  };

  return (
    <div className="main">
      <Navbar />

      <div className="detect-container">
        <video ref={videoRef} autoPlay className="video" />
        <canvas ref={canvasRef} style={{ display: "none" }} />

        <div className="card">
          <h2>{emotion.toUpperCase()}</h2>

          <div className="progress">
            <div
              className="progress-fill"
              style={{ width: `${confidence * 100}%` }}
            />
          </div>

          <p>{(confidence * 100).toFixed(0)}%</p>
        </div>
      </div>
    </div>
  );
}