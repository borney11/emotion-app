import Navbar from "../components/Navbar";

const tips = {
  sad: [
    "Go outside for 10 minutes",
    "Listen to uplifting music",
    "Talk to someone you trust"
  ],
  angry: [
    "Take deep breaths (4-4-4-4)",
    "Step away before reacting",
    "Do quick physical exercise"
  ],
  anxious: [
    "Try grounding (5-4-3-2-1)",
    "Slow breathing",
    "Reduce caffeine intake"
  ],
  neutral: [
    "Stay active",
    "Maintain routine",
    "Practice gratitude"
  ]
};

export default function Improve() {
  return (
    <div className="main">
      <Navbar />

      <div className="improve">
        <h1>Improve Your Mood</h1>

        {Object.keys(tips).map((emotion) => (
          <div key={emotion} className="tip-card">
            <h2>{emotion.toUpperCase()}</h2>

            <ul>
              {tips[emotion].map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}