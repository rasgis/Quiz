import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { QuizProgress, QuestionCard, QuizResult } from "./components";
import styles from "./QuizPage.module.css";

export const QuizPage = () => {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/quiz");
        setQuiz(response.data);

        const initialAnswers = {};
        response.data.questions.forEach((q) => {
          initialAnswers[q._id] = null;
        });
        setSelectedAnswers(initialAnswers);
        setLoading(false);
      } catch (err) {
        setError("Не удалось загрузить тест. Пожалуйста, попробуйте позже.");
        setLoading(false);
      }
    };

    fetchQuiz();
  }, []);

  const handleOptionSelect = (optionIndex) => {
    const currentQuestion = quiz.questions[currentQuestionIndex];
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion._id]: optionIndex,
    });
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    const currentQuestion = quiz.questions[currentQuestionIndex];
    const selectedOption = selectedAnswers[currentQuestion._id];

    if (currentQuestionIndex === quiz.questions.length - 1) {
      let correctCount = 0;
      quiz.questions.forEach((question) => {
        if (selectedAnswers[question._id] === question.correctOptionIndex) {
          correctCount++;
        }
      });

      setScore({
        correct: correctCount,
        total: quiz.questions.length,
      });

      setQuizCompleted(true);

      const historyItem = {
        date: new Date().toISOString(),
        correctAnswers: correctCount,
        totalQuestions: quiz.questions.length,
      };

      const history = JSON.parse(localStorage.getItem("quizHistory") || "[]");
      localStorage.setItem(
        "quizHistory",
        JSON.stringify([historyItem, ...history])
      );
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);

    const resetAnswers = {};
    quiz.questions.forEach((q) => {
      resetAnswers[q._id] = null;
    });
    setSelectedAnswers(resetAnswers);
    setQuizCompleted(false);
    setScore({ correct: 0, total: 0 });
  };

  const handleGoHome = () => {
    navigate("/");
  };

  if (loading) {
    return <div className={styles.loading}>Загрузка теста...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!quiz || quiz.questions.length === 0) {
    return (
      <div className={styles.error}>
        Тест не найден или не содержит вопросов.
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <QuizResult
        score={score}
        onRestart={handleRestartQuiz}
        onGoHome={handleGoHome}
      />
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const selectedOption = selectedAnswers[currentQuestion._id];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{quiz.title}</h2>

      <QuizProgress
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={quiz.questions.length}
      />

      <QuestionCard
        question={currentQuestion}
        selectedOption={selectedOption}
        onOptionSelect={handleOptionSelect}
        onNextQuestion={handleNextQuestion}
        onPreviousQuestion={handlePreviousQuestion}
        showPreviousButton={currentQuestionIndex > 0}
        isLastQuestion={isLastQuestion}
        canMoveNext={selectedOption !== null}
      />
    </div>
  );
};
