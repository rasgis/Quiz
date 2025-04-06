import { useState, useEffect } from "react";
import { WelcomeSection, HistorySection } from "./components";
import styles from "./HomePage.module.css";

export const HomePage = () => {
  const [quizHistory, setQuizHistory] = useState([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("quizHistory") || "[]");
    setQuizHistory(history);
  }, []);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("ru-RU", options);
  };

  return (
    <div className={styles.container}>
      <WelcomeSection />
      <HistorySection quizHistory={quizHistory} formatDate={formatDate} />
    </div>
  );
};
