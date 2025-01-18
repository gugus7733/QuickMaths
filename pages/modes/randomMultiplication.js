import React, { useState } from "react";
import NumericPad from "../../components/NumericPad";
import BackButton from "../../components/BackButton";
import styles from "../../styles/RandomMultiplication.module.css";

export default function RandomMultiplication() {
  const [difficulty, setDifficulty] = useState(1); // Niveau de difficulté par défaut
  const [num1, setNum1] = useState(1);
  const [num2, setNum2] = useState(1);
  const [operation, setOperation] = useState("*"); // Par défaut multiplication
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null); // null, true, or false

  // Génère un type d'opération aléatoire (* ou /)
  function generateRandomOperation() {
    return Math.random() < 0.5 ? "*" : "/";
  }

  // Génère un nombre aléatoire en fonction de la difficulté
  function generateRandomNumber(difficultyLevel) {
    const min = Math.pow(10, difficultyLevel - 1);
    const max = Math.pow(10, difficultyLevel) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Génère une question
  function generateQuestion(newDifficulty) {
    const difficultyToUse = newDifficulty || difficulty;
    const newOperation = generateRandomOperation();
    let newNum1, newNum2;

    if (newOperation === "*") {
      newNum1 = generateRandomNumber(difficultyToUse); // Facteur ajusté pour la difficulté
      newNum2 = generateRandomNumber(difficultyToUse);
    } else {
      newNum2 = Math.floor(Math.random() * 10) + 1; // Diviseur entre 1 et 10
      const result = generateRandomNumber(difficultyToUse); // Résultat final pour la division
      newNum1 = result * newNum2; // Garantit un résultat entier
    }

    setOperation(newOperation);
    setNum1(newNum1);
    setNum2(newNum2);
  }

  // Change le niveau de difficulté et génère une nouvelle question immédiatement
  function handleDifficultyChange(event) {
    const newDifficulty = parseInt(event.target.value);
    setDifficulty(newDifficulty);
    generateQuestion(newDifficulty);
  }

  function handleInput(value) {
      // Si on sort d’une validation, on réinitialise
      if (isCorrect !== null) {
        setUserAnswer(value.toString());
        setIsCorrect(null);
      } else {
        setUserAnswer(prev => prev + value.toString());
      }
    }

  function handleClear() {
    setUserAnswer("");
    setIsCorrect(null);
  }

  function handleBackspace() {
    setUserAnswer((prev) => prev.slice(0, -1));
    setIsCorrect(null);
  }

  function handleSubmit() {
    const correctAnswer =
      operation === "*" ? num1 * num2 : Math.floor(num1 / num2);

    const isAnswerCorrect = parseInt(userAnswer) === correctAnswer;
    setIsCorrect(isAnswerCorrect);
    setUserAnswer(correctAnswer.toString());

    generateQuestion();
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Multiplications</h1>

      {/* Menu déroulant pour la difficulté avec effet de flamme */}
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
        Combien font {num1} {operation} {num2} ?
      </p>

      <div
        className={`${styles.answer} ${
          isCorrect === true
            ? styles.correct
            : isCorrect === false
            ? styles.incorrect
            : ""
        }`} onClick={handleClear}
      >
        {userAnswer || "..."} 
      </div>

      <NumericPad
        onInput={handleInput}
        onClear={handleClear}
        onSubmit={handleSubmit}
        onBackspace={handleBackspace}
      />

      <BackButton />
    </div>
  );
}
