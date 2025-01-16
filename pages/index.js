import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.menuContainer}>
      <h1 className={styles.menuTitle}>Bienvenue sur QuickMaths</h1>
      <Link href="/modes/addition">
        <button className={styles.menuButton}>Mode Addition</button>
      </Link>
      <Link href="/modes/multiplication">
        <button className={styles.menuButton}>Tables de Multiplication</button>
      </Link>
      <Link href="/modes/randomMultiplication">
        <button className={styles.menuButton}>Mode Multiplications</button>
      </Link>
    </div>
  );
}
