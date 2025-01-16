import React, { useState } from "react"; // Ajout de l'import de useState
import styles from "../../styles/Multiplication.module.css";

export default function Multiplication() {
  const [viewMode, setViewMode] = useState("menu"); // 'menu', 'viewAll', 'train'

  // Déplace les hooks pour l'entraînement ici
  const [table, setTable] = useState(1);
  const [number, setNumber] = useState(Math.floor(Math.random() * 10));
  const [userAnswer, setUserAnswer] = useState("");
  const [message, setMessage] = useState("");

  function checkAnswer(e) {
    e.preventDefault();
    if (parseInt(userAnswer) === table * number) {
      setMessage("Bonne réponse !");
    } else {
      setMessage("Essaye encore !");
    }
    setNumber(Math.floor(Math.random() * 10));
    setUserAnswer("");
  }

  function renderMenu() {
    return (
      <div className={styles.menu}>
        <h1 className={styles.title}>Mode Tables de Multiplication</h1>
        <button
          className={styles.button}
          onClick={() => setViewMode("viewAll")}
        >
          Visualiser toutes les tables (0 à 15)
        </button>
        <button
          className={styles.button}
          onClick={() => setViewMode("train")}
        >
          S'entraîner sur les tables (1 à 9)
        </button>
      </div>
    );
  }

  function renderAllTables() {
    const tables = Array.from({ length: 16 }, (_, i) => i);

    return (
      <div className={styles.allTables}>
        <button
          className={styles.backButton}
          onClick={() => setViewMode("menu")}
        >
          Retour
        </button>
        <h2 className={styles.title}>Tables de multiplication</h2>
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
      </div>
    );
  }

  function renderTraining() {
    return (
      <div className={styles.training}>
        <button
          className={styles.backButton}
          onClick={() => setViewMode("menu")}
        >
          Retour
        </button>
        <h2 className={styles.title}>S'entraîner sur une table</h2>
        <label>
          Choisissez une table :
          <select
            value={table}
            onChange={(e) => setTable(parseInt(e.target.value))}
            className={styles.select}
          >
            {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                Table de {num}
              </option>
            ))}
          </select>
        </label>
        <p className={styles.question}>
          Combien font {table} × {number} ?
        </p>
        <form onSubmit={checkAnswer} className={styles.form}>
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

  return (
    <div className={styles.container}>
      {viewMode === "menu" && renderMenu()}
      {viewMode === "viewAll" && renderAllTables()}
      {viewMode === "train" && renderTraining()}
    </div>
  );
}
