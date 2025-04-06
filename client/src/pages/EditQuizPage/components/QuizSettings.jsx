export const QuizSettings = ({ title, onTitleChange, onSave }) => {
  return (
    <div className="quiz-settings card">
      <div className="form-group">
        <label htmlFor="quizTitle">Название теста:</label>
        <input
          type="text"
          id="quizTitle"
          value={title}
          onChange={onTitleChange}
          className="form-control"
        />
      </div>

      <button onClick={onSave} className="btn-primary">
        Сохранить изменения
      </button>
    </div>
  );
};
