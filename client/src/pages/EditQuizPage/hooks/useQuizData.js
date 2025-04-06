import { useState, useEffect } from "react";
import axios from "axios";

export const useQuizData = () => {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/quiz");
      setQuiz(response.data);
      setLoading(false);
    } catch (err) {
      setError("Не удалось загрузить тест. Пожалуйста, попробуйте позже.");
      setLoading(false);
    }
  };

  const handleTitleChange = (e) => {
    setQuiz({ ...quiz, title: e.target.value });
  };

  const handleSaveQuiz = async () => {
    try {
      setLoading(true);
      await axios.put("/api/quiz", quiz);
      setSuccess("Тест успешно сохранен");
      setLoading(false);

      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      setError("Не удалось сохранить тест. Пожалуйста, попробуйте позже.");
      setLoading(false);
    }
  };

  const showSuccessMessage = (message) => {
    setSuccess(message);
    setTimeout(() => {
      setSuccess(null);
    }, 3000);
  };

  return {
    quiz,
    setQuiz,
    loading,
    setLoading,
    error,
    setError,
    success,
    setSuccess,
    handleTitleChange,
    handleSaveQuiz,
    showSuccessMessage,
  };
};
