import React, { useState } from "react";
import NumericPad from "../../components/NumericPad";
import BackButton from "../../components/BackButton";
import styles from "../../styles/Addition.module.css";

export default function Addition() {
  const [difficulty, setDifficulty] = useState(1); // Niveau de difficulté par défaut
  const [num1, setNum1] = useState(generateRandomNumber(difficulty));
  const [num2, setNum2] = useState(generateRandomNumber(difficulty));
  const [operation, setOperation] = useState(generateRandomOperation()); // + ou -
  const [userAnswer, setUserAnswer] = useState("");
  const [message, setMessage] = useState("");

  function generateRandomNumber(difficultyLevel) {
    const max = Math.pow(10, difficultyLevel) - 1; // Par exemple : 99 pour difficulté 2
    const randomValue = Math.floor(Math.random() * (2 * max + 1)) - max; // Symétrie autour de 0
    return randomValue;
  }

  function generateRandomOperation() {
    return Math.random() < 0.5 ? "+" : "-";
  }

  function handleDifficultyChange(event) {
    const newDifficulty = parseInt(event.target.value);
    setDifficulty(newDifficulty);

    // Régénère les nombres et l'opération
    setNum1(generateRandomNumber(newDifficulty));
    setNum2(generateRandomNumber(newDifficulty));
    setOperation(generateRandomOperation());
    setUserAnswer("");
    setMessage("");
  }

  function toggleAnswerSign() {
    setUserAnswer((prev) =>
      prev.startsWith("-") ? prev.slice(1) : `-${prev}`
    );
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
    const correctAnswer =
      operation === "+"
        ? num1 + num2
        : num1 - num2;

    if (parseInt(userAnswer) === correctAnswer) {
      setMessage("Bonne réponse !");
    } else {
      setMessage(`Faux ! La bonne réponse était ${correctAnswer}.`);
    }

    // Régénère une nouvelle question
    setNum1(generateRandomNumber(difficulty));
    setNum2(generateRandomNumber(difficulty));
    setOperation(generateRandomOperation());
    setUserAnswer("");
  }

  // Formatage propre de la question
  function formatQuestion() {
    if (num2 < 0) {
      // Ajuste l'opérateur et le deuxième nombre
      return operation === "+"
        ? `${num1} - ${Math.abs(num2)}`
        : `${num1} + ${Math.abs(num2)}`;
    }
    // Aucun ajustement nécessaire si num2 est positif
    return `${num1} ${operation} ${num2}`;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Additions</h1>

      {/* Menu déroulant avec animation conditionnelle */}
      <label
        htmlFor="difficulty"
        className={`${styles.label} ${difficulty >= 3 ? styles[`flame-${difficulty}`] : ""}`}
      >
        Niveau de difficulté :
      </label>
      <select
        id="difficulty"
        value={difficulty}
        onChange={handleDifficultyChange}
        className={styles.select}
      >
        {[1, 2, 3, 4, 5].map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>

      <p className={styles.question}>
        Combien font {formatQuestion()} ?
      </p>

      <div className={styles.answer} onClick={toggleAnswerSign}>
        {userAnswer || "Cliquez ici"}
      </div>

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
