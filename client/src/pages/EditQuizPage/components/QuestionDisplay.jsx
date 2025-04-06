export const QuestionDisplay = ({ question, index, onEdit, onDelete, canDelete }) => {
  return (
    <>
      <h4>
        <span className="question-number">#{index + 1}</span> {question.text}
      </h4>

      <ul className="options-display">
        {question.options.map((option, optionIndex) => (
          <li
            key={optionIndex}
            className={
              optionIndex === question.correctOptionIndex
                ? "correct-option"
                : ""
            }
          >
            {option.text}
            {optionIndex === question.correctOptionIndex && (
              <span className="correct-badge">✓</span>
            )}
          </li>
        ))}
      </ul>

      <div className="question-item-actions">
        <button onClick={() => onEdit(question)} className="button-outline">
          Редактировать
        </button>
        <button
          onClick={() => onDelete(question._id)}
          className="button-danger"
          disabled={!canDelete}
        >
          Удалить
        </button>
      </div>
    </>
  );
};
