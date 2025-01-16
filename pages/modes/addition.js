import React, { useState } from "react";
import styles from "../../styles/Addition.module.css";
import BackButton from "../../components/BackButton";
import NumericPad from "../../components/NumericPad";

export default function Addition() {
  const [num1, setNum1] = useState(generateRandomNumber());
  const [num2, setNum2] = useState(generateRandomNumber());
  const [userAnswer, setUserAnswer] = useState("");
  const [message, setMessage] = useState("");

  function generateRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
  }

  function handleInput(value) {
    setUserAnswer((prev) => prev + value.toString());
  }

  function handleClear() {
    setUserAnswer("");
  }

  function handleBackspace() {
    setUserAnswer((prev) => prev.slice(0, -1));
  }

  function handleSubmit() {
    const correctAnswer = num1 + num2;
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
      <h1 className={styles.title}>Mode Addition</h1>
      <p className={styles.question}>
        Combien font {num1} + {num2} ?
      </p>
      <div className={styles.answer}>{userAnswer || "..."}</div>
      <NumericPad
        onInput={handleInput}
        onClear={handleClear}
        onSubmit={handleSubmit}
        onBackspace={handleBackspace}
      />
      {message && <p className={styles.message}>{message}</p>}
      <BackButton />
    </div>
  );
}
