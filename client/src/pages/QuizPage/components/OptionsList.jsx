import styles from "./OptionsList.module.css";

export const OptionsList = ({ options, selectedOption, onOptionSelect }) => {
  return (
    <div className={styles.list}>
      {options.map((option, index) => (
        <div
          key={index}
          className={`${styles.option} ${
            selectedOption === index ? styles.selected : ""
          }`}
          onClick={() => onOptionSelect(index)}
        >
          {option.text}
        </div>
      ))}
    </div>
  );
};
