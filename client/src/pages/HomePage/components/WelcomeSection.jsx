import { useNavigate } from "react-router-dom";
import styles from "./WelcomeSection.module.css";

export const WelcomeSection = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.welcome}>
      <h1 className={styles.title}>Добро пожаловать в Quiz App!</h1>
      <p className={styles.description}>
        Проверьте свои знания, пройдя наш тест. Вы можете редактировать вопросы
        или начать тестирование прямо сейчас.
      </p>
      <button className={styles.startButton} onClick={() => navigate("/quiz")}>
        Начать тест
      </button>
    </section>
  );
};

