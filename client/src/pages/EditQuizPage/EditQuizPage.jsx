import { useNavigate } from "react-router-dom";
import {
  AddQuestionForm,
  Notifications,
  QuestionsList,
  QuizSettings,
} from "./components";
import {
  useQuizData,
  useQuestionManagement,
  useOptionsManagement,
} from "./hooks";
import styles from "./EditQuizPage.module.css";

export const EditQuizPage = () => {
  const navigate = useNavigate();

  const {
    quiz,
    setQuiz,
    loading: quizLoading,
    error: quizError,
    success: quizSuccess,
    handleTitleChange,
    handleSaveQuiz,
    showSuccessMessage,
  } = useQuizData();

  const {
    newQuestion,
    setNewQuestion,
    editingQuestionId,
    editingQuestion,
    setEditingQuestion,
    handleNewQuestionTextChange,
    handleAddQuestion,
    handleDeleteQuestion,
    handleStartEditingQuestion,
    handleCancelEditing,
    handleEditQuestionTextChange,
    handleSaveEditedQuestion,
    loading: questionLoading,
    success: questionSuccess,
    error: questionError,
  } = useQuestionManagement(quiz, setQuiz);

  const {
    updateOptionText: handleNewQuestionOptionChange,
    addOption: handleAddOption,
    removeOption: handleRemoveOption,
    setCorrectOption: handleSetCorrectOption,
  } = useOptionsManagement(newQuestion, setNewQuestion);

  const {
    updateOptionText: handleEditQuestionOptionChange,
    addOption: handleAddEditOption,
    removeOption: handleRemoveEditOption,
    setCorrectOption: handleSetEditCorrectOption,
  } = useOptionsManagement(editingQuestion, setEditingQuestion);

  const loading = quizLoading || questionLoading;
  const error = quizError || questionError;
  const success = quizSuccess || questionSuccess;

  if (loading && !quiz) {
    return <div className={styles.loading}>Загрузка теста...</div>;
  }

  if (error && !quiz) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!quiz) {
    return <div className={styles.error}>Тест не найден.</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Редактирование теста</h2>
        <button className={styles.saveButton} onClick={() => navigate("/")}>
          Назад
        </button>
      </div>

      <Notifications success={success} error={error} />

      <QuizSettings
        title={quiz.title}
        onTitleChange={handleTitleChange}
        onSave={handleSaveQuiz}
      />

      <div className={styles.mainContent}>
        <div>
          <h3 className={styles.title}>Вопросы</h3>

          <QuestionsList
            questions={quiz.questions}
            editingQuestionId={editingQuestionId}
            editingQuestion={editingQuestion}
            onStartEditing={handleStartEditingQuestion}
            onDeleteQuestion={handleDeleteQuestion}
            onEditQuestionTextChange={handleEditQuestionTextChange}
            onEditQuestionOptionChange={handleEditQuestionOptionChange}
            onSetEditCorrectOption={handleSetEditCorrectOption}
            onRemoveEditOption={handleRemoveEditOption}
            onAddEditOption={handleAddEditOption}
            onSaveEditedQuestion={handleSaveEditedQuestion}
            onCancelEditing={handleCancelEditing}
          />
        </div>

        <AddQuestionForm
          newQuestion={newQuestion}
          onTextChange={handleNewQuestionTextChange}
          onOptionChange={handleNewQuestionOptionChange}
          onSetCorrectOption={handleSetCorrectOption}
          onRemoveOption={handleRemoveOption}
          onAddOption={handleAddOption}
          onAddQuestion={handleAddQuestion}
        />
      </div>
    </div>
  );
};
