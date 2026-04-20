import streamlit as st
import cv2
import numpy as np
import tensorflow as tf
from streamlit_webrtc import webrtc_streamer, VideoProcessorBase
import av

st.title("Real-Time Emotion Detection")

# Load model
model = tf.keras.models.load_model("facialemotionmodel.h5")

classes = ["angry", "disgust", "fear", "happy", "neutral", "sad", "surprise"]

# Face detector
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")


class EmotionProcessor(VideoProcessorBase):
    def __init__(self):
        self.frame_count = 0
        self.last_emotion = "..."
        self.last_conf = 0

    def recv(self, frame):
        img = frame.to_ndarray(format="bgr24")

        # 🔻 Resize frame (faster processing)
        img = cv2.resize(img, (320, 240))

        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        # 🔻 Process every 3rd frame
        self.frame_count += 1
        if self.frame_count % 3 == 0:
            faces = face_cascade.detectMultiScale(gray, 1.3, 5)

            for (x, y, w, h) in faces:
                face = gray[y:y+h, x:x+w]
                face = cv2.resize(face, (48, 48))

                face = face / 255.0
                face = np.reshape(face, (1, 48, 48, 1))

                preds = model.predict(face, verbose=0)

                self.last_emotion = classes[np.argmax(preds)]
                self.last_conf = float(np.max(preds))

                # Draw box
                cv2.rectangle(img, (x, y), (x+w, y+h), (0, 255, 0), 2)

        # 🔻 Show last prediction (smooth UI)
        cv2.putText(
            img,
            f"{self.last_emotion} ({self.last_conf:.2f})",
            (10, 30),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (0, 255, 0),
            2
        )

        return av.VideoFrame.from_ndarray(img, format="bgr24")


webrtc_streamer(
    key="emotion",
    video_processor_factory=EmotionProcessor,
    media_stream_constraints={
        "video": {"frameRate": 15},
        "audio": False
    }
)