import styles from "./HistoryItem.module.css";

export const HistoryItem = ({ item }) => {
  const date = new Date(item.date);
  const formattedDate = date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const percentage = Math.round(
    (item.correctAnswers / item.totalQuestions) * 100
  );

  return (
    <div className={styles.item}>
      <span className={styles.date}>{formattedDate}</span>
      <div className={styles.score}>
        <span className={styles.scoreValue}>
          {item.correctAnswers} из {item.totalQuestions}
        </span>
        <span className={styles.percentage}>({percentage}%)</span>
      </div>
    </div>
  );
};
