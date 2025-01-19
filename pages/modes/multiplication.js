import React, { useState } from "react";
import BackButton from "../../components/BackButton";
import NumericPad from "../../components/NumericPad";
import styles from "../../styles/Multiplication.module.css";
import { updateScore } from "../../firebase";

export default function Multiplication({ username }) {
  const [mode, setMode] = useState("menu"); // Modes possibles : "menu", "viewAll", "train"
  const [table, setTable] = useState(generateRandomNumber(1, 9)); // Table aléatoire pour l'entraînement
  const [number, setNumber] = useState(generateRandomNumber(0, 10));
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null); // null, true, or false

  // Fonction pour générer un nombre aléatoire
  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Gestion des modes
  function renderMenu() {
    return (
      <div className={styles.menu}>
        <h1 className={styles.title}>Tables de Multiplication</h1>
        <button className={styles.button} onClick={() => setMode("viewAll")}>
          Afficher les tables
        </button>
        <button className={styles.button} onClick={() => setMode("train")}>
          Entraînement
        </button>
        <BackButton />
      </div>
    );
  }

  function renderAllTables() {
    const tables = Array.from({ length: 16 }, (_, i) => i); // Tables de 0 à 15
  
    return (
      <div className={styles.allTablesContainer}>
        <h2 className={styles.title}>Tables</h2>
        <div className={styles.tables}>
          {tables.map((num) => (
            <div key={num} className={styles.table}>
              <h3 className={styles.tableTitle}>Table de {num}</h3>
              {Array.from({ length: 10 }, (_, i) => (
                <p key={i} className={styles.row}>
                  {num} × {i} = {num * i}
                </p>
              ))}
            </div>
          ))}
        </div>
        <BackButton />
      </div>
    );
  }

  function renderTraining() {

    function handleClear() {
      setUserAnswer("");
      setIsCorrect(null);
    }

    function handleBackspace() {
      setUserAnswer((prev) => prev.slice(0, -1));
      setIsCorrect(null);
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

    function handleSubmit() {
      const correctAnswer = table * number;
      const isAnswerCorrect = parseInt(userAnswer) === correctAnswer;
      setIsCorrect(isAnswerCorrect);
      setUserAnswer(correctAnswer.toString());

      if (isAnswerCorrect) {
        updateScore(username, "tables", 1); // Incrémente le score
      }

      // Génère un nouveau calcul
      setTable(generateRandomNumber(1, 9));
      setNumber(generateRandomNumber(0, 10));
    }

    return (
      <div className={styles.training}>
        <h2 className={styles.title}>Entraînement</h2>
        <p className={styles.question}>
          Combien font {table} × {number} ?
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

  // Affichage selon le mode
  return (
    <div className={styles.container}>
      {mode === "menu" && renderMenu()}
      {mode === "viewAll" && renderAllTables()}
      {mode === "train" && renderTraining()}
    </div>
  );
}
