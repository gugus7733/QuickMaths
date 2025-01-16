import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Bienvenue sur QuickMaths !</h1>
      <p>Choisissez un mode pour commencer :</p>
      <ul>
        <li><Link href="/modes/addition">Mode Addition</Link></li>
        <li><Link href="/modes/multiplication">Mode Multiplication</Link></li>
      </ul>
    </div>
  );
}