import styles from "./QuestionsList.module.css";

export const QuestionsList = ({
  questions,
  editingQuestionId,
  editingQuestion,
  onStartEditing,
  onDeleteQuestion,
  onEditQuestionTextChange,
  onEditQuestionOptionChange,
  onSetEditCorrectOption,
  onRemoveEditOption,
  onAddEditOption,
  onSaveEditedQuestion,
  onCancelEditing,
}) => {
  const renderEditForm = (question) => (
    <div className={styles.questionItem}>
      <div className={styles.formGroup}>
        <input
          type="text"
          value={editingQuestion.text}
          onChange={onEditQuestionTextChange}
          className={styles.formControl}
          placeholder="Введите текст вопроса"
        />
      </div>
      <div className={styles.optionsList}>
        {editingQuestion.options.map((option, index) => (
          <div key={index} className={styles.optionRow}>
            <input
              type="text"
              value={option.text}
              onChange={(e) => onEditQuestionOptionChange(index, e)}
              className={styles.formControl}
              placeholder={`Вариант ответа ${index + 1}`}
            />
            <div className={styles.optionActions}>
              <button
                className={`${styles.correctButton} ${
                  editingQuestion.correctOptionIndex === index
                    ? styles.active
                    : ""
                }`}
                onClick={() => onSetEditCorrectOption(index)}
              >
                {editingQuestion.correctOptionIndex === index
                  ? "Правильный ответ ✓"
                  : "Отметить как правильный"}
              </button>
              {editingQuestion.options.length > 2 && (
                <button
                  className={styles.removeButton}
                  onClick={() => onRemoveEditOption(index)}
                >
                  Удалить
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className={styles.addOptionButton} onClick={onAddEditOption}>
        Добавить вариант ответа
      </button>

      <div className={styles.controls}>
        <button className={styles.editButton} onClick={onCancelEditing}>
          Отмена
        </button>
        <button className={styles.deleteButton} onClick={onSaveEditedQuestion}>
          Сохранить
        </button>
      </div>
    </div>
  );

  const renderQuestionView = (question, index) => (
    <div className={styles.questionItem}>
      <h4 className={styles.questionText}>
        <span>{index + 1}. </span>
        {question.text}
      </h4>

      <ul className={styles.optionsDisplay}>
        {question.options.map((option, optionIndex) => (
          <li
            key={optionIndex}
            className={
              optionIndex === question.correctOptionIndex
                ? styles.correctOption
                : styles.optionItem
            }
          >
            {option.text}
            {optionIndex === question.correctOptionIndex && (
              <span className={styles.correctBadge}>✓</span>
            )}
          </li>
        ))}
      </ul>

      <div className={styles.controls}>
        <button
          className={styles.editButton}
          onClick={() => onStartEditing(question)}
        >
          Редактировать
        </button>
        <button
          className={styles.deleteButton}
          onClick={() => onDeleteQuestion(question._id)}
        >
          Удалить
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.questionsList}>
      {questions.map((question, index) =>
        editingQuestionId === question._id
          ? renderEditForm(question)
          : renderQuestionView(question, index)
      )}
    </div>
  );
};
