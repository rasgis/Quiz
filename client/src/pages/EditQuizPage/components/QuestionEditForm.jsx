export const QuestionEditForm = ({
  question,
  onTextChange,
  onOptionChange,
  onSetCorrectOption,
  onRemoveOption,
  onAddOption,
  onSave,
  onCancel,
}) => {
  return (
    <div className="edit-question-form">
      <div className="form-group">
        <label>Текст вопроса:</label>
        <input
          type="text"
          value={question.text}
          onChange={onTextChange}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label>Варианты ответов:</label>
        {question.options.map((option, optionIndex) => (
          <div key={optionIndex} className="option-row">
            <input
              type="text"
              value={option.text}
              onChange={(e) => onOptionChange(optionIndex, e)}
              className="form-control"
            />
            <div className="option-actions">
              <button
                type="button"
                onClick={() => onSetCorrectOption(optionIndex)}
                className={`option-correct-button ${
                  question.correctOptionIndex === optionIndex ? "correct" : ""
                }`}
              >
                {question.correctOptionIndex === optionIndex
                  ? "✓ Правильный"
                  : "Сделать правильным"}
              </button>

              <button
                type="button"
                onClick={() => onRemoveOption(optionIndex)}
                className="button-danger option-remove-button"
                disabled={question.options.length <= 2}
              >
                Удалить
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={onAddOption}
          className="button-outline add-option-button"
        >
          + Добавить вариант
        </button>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onSave} className="btn-primary">
          Сохранить
        </button>
        <button type="button" onClick={onCancel} className="button-outline">
          Отмена
        </button>
      </div>
    </div>
  );
};

