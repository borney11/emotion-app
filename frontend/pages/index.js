import Navbar from "../components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="main">
      <Navbar />

      <div className="hero">
        <h1>Understand Your Emotions in Real-Time</h1>
        <p>AI-powered emotion detection + improvement</p>

        <div className="buttons">
          <Link href="/detect">
            <button className="primary">Start Detection</button>
          </Link>

          <Link href="/improve">
            <button className="secondary">Improve Mood</button>
          </Link>
        </div>
      </div>
    </div>
  );
}