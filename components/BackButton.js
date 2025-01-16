import Link from "next/link";
import styles from "../styles/BackButton.module.css";
import { FiArrowLeft } from "react-icons/fi"; // Flèche plus élégante

export default function BackButton() {
  return (
    <Link href="/">
      <button className={styles.backButton}>
        <FiArrowLeft className={styles.icon} />
      </button>
    </Link>
  );
}