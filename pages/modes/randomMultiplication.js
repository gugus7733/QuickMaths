import React, { useState } from "react";
import BackButton from "../../components/BackButton";
import styles from "../../styles/RandomMultiplication.module.css";

export default function RandomMultiplication() {
  const [num1, setNum1] = useState(generateRandomNumber());
  const [num2, setNum2] = useState(generateRandomNumber());
  const [userAnswer, setUserAnswer] = useState("");
  const [message, setMessage] = useState("");

  function generateRandomNumber() {
    return Math.floor(Math.random() * 10) + 1; // Génère un nombre entre 1 et 10
  }

  function handleSubmit(e) {
    e.preventDefault();
    const correctAnswer = num1 * num2;
    if (parseInt(userAnswer) === correctAnswer) {
      setMessage("Bonne réponse !");
    } else {
      setMessage(`Faux ! La bonne réponse était ${correctAnswer}.`);
    }
    setNum1(generateRandomNumber());
    setNum2(generateRandomNumber());
    setUserAnswer("");
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mode Multiplications</h1>
      <p className={styles.question}>
        Combien font {num1} × {num2} ?
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
      <BackButton />
    </div>
  );
}
