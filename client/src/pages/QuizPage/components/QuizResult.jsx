import styles from "./QuizResult.module.css";

export const QuizResult = ({ score, onRestart, onGoHome }) => {
  const percentage = Math.round((score.correct / score.total) * 100);
  const getMessage = () => {
    if (percentage >= 80) return "Отличный результат!";
    if (percentage >= 60) return "Хороший результат!";
    return "Попробуйте пройти тест еще раз";
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Тест завершен!</h2>
      <div className={styles.score}>
        <p className={styles.scoreText}>
          Ваш результат: {score.correct} из {score.total} правильных ответов
        </p>
        <p className={styles.percentage}>{percentage}%</p>
        <p className={styles.message}>{getMessage()}</p>
      </div>
      <div className={styles.actions}>
        <button onClick={onRestart} className={styles.restartButton}>
          Пройти еще раз
        </button>
        <button onClick={onGoHome} className={styles.homeButton}>
          На главную
        </button>
      </div>
    </div>
  );
};
