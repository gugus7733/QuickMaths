import React, { useState } from "react";
import BackButton from "../../components/BackButton";
import NumericPad from "../../components/NumericPad";
import styles from "../../styles/Multiplication.module.css";

export default function Multiplication() {
  const [mode, setMode] = useState("menu"); // Modes possibles : "menu", "viewAll", "train"
  const [table, setTable] = useState(generateRandomNumber(1, 9)); // Table aléatoire pour l'entraînement
  const [number, setNumber] = useState(generateRandomNumber(0, 10));
  const [userAnswer, setUserAnswer] = useState("");
  const [message, setMessage] = useState("");

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
          Visualiser toutes les tables (0 à 15)
        </button>
        <button className={styles.button} onClick={() => setMode("train")}>
          S'entraîner sur les tables (1 à 9)
        </button>
        <BackButton />
      </div>
    );
  }

  function renderAllTables() {
    const tables = Array.from({ length: 16 }, (_, i) => i); // Tables de 0 à 15

    return (
      <div className={styles.allTables}>

        <h2 className={styles.title}>Visualisation des tables de multiplication</h2>
        <div className={styles.tablesContainer}>
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
      const correctAnswer = table * number;
      if (parseInt(userAnswer) === correctAnswer) {
        setMessage("Bonne réponse !");
      } else {
        setMessage(`Faux ! La bonne réponse était ${correctAnswer}.`);
      }

      // Génère un nouveau calcul
      setTable(generateRandomNumber(1, 9));
      setNumber(generateRandomNumber(0, 10));
      setUserAnswer("");
    }

    return (
      <div className={styles.training}>
        <h2 className={styles.title}>Entraînement : Tables de Multiplication</h2>
        <p className={styles.question}>
          Combien font {table} × {number} ?
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

  // Affichage selon le mode
  return (
    <div className={styles.container}>
      {mode === "menu" && renderMenu()}
      {mode === "viewAll" && renderAllTables()}
      {mode === "train" && renderTraining()}
    </div>
  );
}
