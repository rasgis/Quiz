import styles from "./QuizProgress.module.css";

export const QuizProgress = ({ currentQuestionIndex, totalQuestions }) => {
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className={styles.progress}>
      <div className={styles.text}>
        Вопрос {currentQuestionIndex + 1} из {totalQuestions}
      </div>
      <div className={styles.bar}>
        <div className={styles.fill} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};
