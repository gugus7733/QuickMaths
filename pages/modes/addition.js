import React, { useState } from "react";
import styles from "../../styles/Addition.module.css";

export default function Addition() {
  const [num1, setNum1] = useState(generateRandomNumber());
  const [num2, setNum2] = useState(generateRandomNumber());
  const [userAnswer, setUserAnswer] = useState("");
  const [message, setMessage] = useState("");

  function generateRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const correctAnswer = num1 + num2;
    if (parseInt(userAnswer) === correctAnswer) {
      setMessage("Bonne réponse !");
    } else {
      setMessage("Essaye encore !");
    }
    setNum1(generateRandomNumber());
    setNum2(generateRandomNumber());
    setUserAnswer("");
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mode Addition</h1>
      <p className={styles.question}>
        Combien font {num1} + {num2} ?
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className={styles.input}
          placeholder="Votre réponse"
        />
        <button type="submit" className={styles.button}>
          Valider
        </button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}
