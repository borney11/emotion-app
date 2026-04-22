import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="nav">
      <h2 className="logo">EmotionAI</h2>

      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/detect">Detect</Link>
        <Link href="/improve">Improve</Link>
      </div>
    </nav>
  );
}