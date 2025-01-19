import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import styles from "../../styles/Stats.module.css";
import BackButton from "../../components/BackButton";

export default function Stats({ username, userColor }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      const userDoc = doc(db, "Scores", username);
      const docSnap = await getDoc(userDoc);

      if (docSnap.exists()) {
        setStats(docSnap.data());
      } else {
        console.error("Aucune donnée trouvée pour cet utilisateur !");
      }
    }

    fetchStats();
  }, [username]);

  if (!stats) {
    return (
      <div className={styles.statsContainer}>
        <p className={styles.loadingMessage}>Chargement des statistiques...</p>
        <BackButton />
      </div>
    );
  }
  const totalScore =
    Object.values(stats.additions).reduce((a, b) => a + b, 0) +
    Object.values(stats.multiplications).reduce((a, b) => a + b, 0) +
    stats.tables;

    return (
        <div className={styles.statsContainer}>
          <h1 className={styles.modeStatsTitle}>
            Statistiques de&nbsp;
            <span
                className={styles.modeStatsTitle}
                style={{ color: userColor }}
            >
                {username}
            </span>
          </h1>
          <h2 className={styles.subtitle}>Score total : {totalScore}</h2>
      
          <div className={styles.modeStats}>
            <h3 className={styles.modeStatsTitle}>Additions</h3>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Difficulté</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(stats.additions).map(([level, score]) => (
                  <tr key={level}>
                    <td>{level}</td>
                    <td>{score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      
          <div className={styles.modeStats}>
            <h3 className={styles.modeStatsTitle}>Multiplications</h3>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Difficulté</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(stats.multiplications).map(([level, score]) => (
                  <tr key={level}>
                    <td>{level}</td>
                    <td>{score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      
          <div className={styles.modeStats}>
            <h3 className={styles.modeStatsTitle}>Tables de Multiplication</h3>
            <p className={styles.modeStatsText}>{stats.tables} points</p>
          </div>
          <BackButton />
        </div>
      );
      
}
