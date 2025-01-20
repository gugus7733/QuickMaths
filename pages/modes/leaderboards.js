import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import BackButton from "../../components/BackButton";
import styles from "../../styles/Leaderboards.module.css";

export default function Leaderboards({ username }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);

  useEffect(() => {
    async function fetchLeaderboards() {
      const scoresCollection = collection(db, "Scores");
      const querySnapshot = await getDocs(scoresCollection);

      const scores = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const totalScore =
          Object.values(data.additions).reduce((a, b) => a + b, 0) +
          Object.values(data.multiplications).reduce((a, b) => a + b, 0) +
          data.tables;

        scores.push({ pseudo: doc.id, totalScore });
      });

      // Trie par score décroissant
      const sortedScores = scores.sort((a, b) => b.totalScore - a.totalScore);
      setLeaderboard(sortedScores);

      // Trouve le rang de l'utilisateur
      const rank = sortedScores.findIndex((player) => player.pseudo === username) + 1;
      setUserRank(rank);
    }

    fetchLeaderboards();
  }, [username]);

  return (
    <div className={styles.container}>
        <h1 className={styles.GreenText}>Leaderboards</h1>
        <h2 className={styles.GreenText}>Top 3 joueurs</h2>
        <table className={styles.table}>
        <thead>
          <tr>
            <th>Rang</th>
            <th>Pseudo</th>
            <th>Score Total</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.slice(0, 3).map((player, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{player.pseudo}</td>
              <td>{player.totalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>

        <h3 className={styles.fancyTitle}>Votre rang : {userRank || "Non classé"}</h3>
        <BackButton />
    </div>
  );
}
