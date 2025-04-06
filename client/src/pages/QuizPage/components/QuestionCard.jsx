import { OptionsList } from "./OptionsList";
import styles from "./QuestionCard.module.css";

export const QuestionCard = ({
  question,
  selectedOption,
  onOptionSelect,
  onNextQuestion,
  onPreviousQuestion,
  showPreviousButton,
  isLastQuestion,
  canMoveNext,
}) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.questionText}>{question.text}</h3>

      <OptionsList
        options={question.options}
        selectedOption={selectedOption}
        onOptionSelect={onOptionSelect}
      />

      <div className={styles.actions}>
        {showPreviousButton && (
          <button onClick={onPreviousQuestion} className={styles.prevButton}>
            Предыдущий вопрос
          </button>
        )}
        <button
          onClick={onNextQuestion}
          disabled={!canMoveNext}
          className={isLastQuestion ? styles.finishButton : styles.nextButton}
        >
          {isLastQuestion ? "Завершить" : "Следующий вопрос"}
        </button>
      </div>
    </div>
  );
};
