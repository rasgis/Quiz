import { useState } from "react";
import axios from "axios";

export const useQuestionManagement = (quiz, setQuiz) => {

  const [newQuestion, setNewQuestion] = useState({
    text: "",
    options: [{ text: "" }, { text: "" }],
    correctOptionIndex: 0,
  });

  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleNewQuestionTextChange = (e) => {
    setNewQuestion({ ...newQuestion, text: e.target.value });
  };

  const handleEditQuestionTextChange = (e) => {
    setEditingQuestion({ ...editingQuestion, text: e.target.value });
  };

  const handleAddQuestion = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/quiz/question", newQuestion);
      setQuiz(response.data);
      setNewQuestion({
        text: "",
        options: [{ text: "" }, { text: "" }],
        correctOptionIndex: 0,
      });
      setSuccess("Вопрос успешно добавлен");
      setLoading(false);

      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      setError("Не удалось добавить вопрос. Пожалуйста, попробуйте позже.");
      setLoading(false);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    if (!quiz) return;

    if (quiz.questions.length <= 1) {
      setError("Нельзя удалить единственный вопрос теста");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.delete(`/api/quiz/question/${questionId}`);
      setQuiz(response.data);
      setSuccess("Вопрос успешно удален");
      setLoading(false);

      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      setError("Не удалось удалить вопрос. Пожалуйста, попробуйте позже.");
      setLoading(false);
    }
  };

  const handleStartEditingQuestion = (question) => {
    setEditingQuestionId(question._id);
    setEditingQuestion({ ...question });
  };

  const handleCancelEditing = () => {
    setEditingQuestionId(null);
    setEditingQuestion(null);
  };

  const handleSaveEditedQuestion = async () => {
    try {
      setLoading(true);
      const response = await axios.put("/api/quiz/question", {
        questionId: editingQuestionId,
        text: editingQuestion.text,
        options: editingQuestion.options,
        correctOptionIndex: editingQuestion.correctOptionIndex,
      });

      setQuiz(response.data);
      setEditingQuestionId(null);
      setEditingQuestion(null);
      setSuccess("Вопрос успешно обновлен");
      setLoading(false);

      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      setError("Не удалось обновить вопрос. Пожалуйста, попробуйте позже.");
      setLoading(false);
    }
  };

  return {
    newQuestion,
    setNewQuestion,
    editingQuestionId,
    editingQuestion,
    setEditingQuestion,
    handleNewQuestionTextChange,
    handleEditQuestionTextChange,
    handleAddQuestion,
    handleDeleteQuestion,
    handleStartEditingQuestion,
    handleCancelEditing,
    handleSaveEditedQuestion,
    loading,
    success,
    error,
  };
};
