import { useRouter } from "next/router";
import styles from "../styles/BackButton.module.css";
import { FiArrowLeft } from "react-icons/fi"; // Flèche plus élégante

export default function BackButton() {
  const router = useRouter();

  function goBack() {
    router.back(); // Revient à la page précédente dans l'historique
  }

  return (
    <button onClick={goBack} className={styles.backButton}>
      <FiArrowLeft className={styles.icon} />
    </button>
  );
}