import styles from "../styles/NumericPad.module.css";

export default function NumericPad({ onInput, onClear, onSubmit, onBackspace }) {
    const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3]; // Disposition classique
  
    return (
      <div className={styles.padContainer}>
        <div className={styles.numbers}>
          {numbers.map((num) => (
            <button
              key={num}
              className={styles.numberButton}
              onClick={() => onInput(num)}
            >
              {num}
            </button>
          ))}
          {/* Dernière ligne : 0, Retour (Effacer), Valider */}
          <button className={styles.numberButton} onClick={() => onInput(0)}>
            0
          </button>
          <button className={styles.backspaceButton} onClick={onBackspace}>
            ←
          </button>
          <button className={styles.validateButton} onClick={onSubmit}>
            ✔
          </button>
        </div>
      </div>
    );
  }

