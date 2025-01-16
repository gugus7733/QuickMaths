import styles from "../styles/NumericPad.module.css";

export default function NumericPad({ onInput, onClear, onSubmit }) {
  const numbers = Array.from({ length: 10 }, (_, i) => i); // [0, 1, 2, ..., 9]

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
      </div>
      <div className={styles.actions}>
        <button className={styles.actionButton} onClick={onClear}>
          Effacer
        </button>
        <button className={styles.actionButton} onClick={onSubmit}>
          Valider
        </button>
      </div>
    </div>
  );
}
