import { HistoryItem } from "./HistoryItem";
import styles from "./HistorySection.module.css";

export const HistorySection = () => {
  const history = JSON.parse(localStorage.getItem("quizHistory") || "[]");

  return (
    <section className={styles.history}>
      <h2 className={styles.title}>История прохождения</h2>
      {history.length > 0 ? (
        <div className={styles.list}>
          {history.map((item, index) => (
            <HistoryItem key={index} item={item} />
          ))}
        </div>
      ) : (
        <p className={styles.emptyMessage}>История пуста</p>
      )}
    </section>
  );
};
