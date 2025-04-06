import styles from "./AddQuestionForm.module.css";

export const AddQuestionForm = ({
  newQuestion,
  onTextChange,
  onOptionChange,
  onSetCorrectOption,
  onRemoveOption,
  onAddOption,
  onAddQuestion,
}) => {
  const isFormValid =
    newQuestion.text.trim() &&
    !newQuestion.options.some((option) => !option.text.trim());

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Добавить новый вопрос</h3>
      <div className={styles.formGroup}>
        <label htmlFor="newQuestionText" className={styles.label}>
          Текст вопроса:
        </label>
        <input
          type="text"
          id="newQuestionText"
          value={newQuestion.text}
          onChange={onTextChange}
          className={styles.formControl}
          placeholder="Введите текст вопроса"
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Варианты ответов:</label>
        {newQuestion.options.map((option, index) => (
          <div key={index} className={styles.optionRow}>
            <input
              type="text"
              value={option.text}
              onChange={(e) => onOptionChange(index, e)}
              className={styles.formControl}
              placeholder={`Вариант ответа ${index + 1}`}
            />
            <div className={styles.optionActions}>
              <button
                type="button"
                onClick={() => onSetCorrectOption(index)}
                className={`${styles.correctButton} ${
                  newQuestion.correctOptionIndex === index ? styles.active : ""
                }`}
              >
                {newQuestion.correctOptionIndex === index
                  ? "✓ Правильный"
                  : "Сделать правильным"}
              </button>

              <button
                type="button"
                onClick={() => onRemoveOption(index)}
                className={styles.removeButton}
                disabled={newQuestion.options.length <= 2}
              >
                Удалить
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={onAddOption}
          className={styles.addOptionButton}
        >
          + Добавить вариант
        </button>
      </div>

      <button
        onClick={onAddQuestion}
        className={styles.addQuestionButton}
        disabled={!isFormValid}
      >
        Добавить вопрос
      </button>
    </div>
  );
};
