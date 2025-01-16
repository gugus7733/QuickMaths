import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link href="/">Accueil</Link></li>
        <li><Link href="/modes/addition">Addition</Link></li>
        <li><Link href="/modes/multiplication">Multiplication</Link></li>
      </ul>
      <style jsx>{`
        nav ul {
          display: flex;
          gap: 15px;
          list-style: none;
          padding: 0;
        }
        nav a {
          text-decoration: none;
          color: blue;
        }
      `}</style>
    </nav>
  );
}
