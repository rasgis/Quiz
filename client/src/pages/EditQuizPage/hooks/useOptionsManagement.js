export const useOptionsManagement = (question, setQuestion) => {
  const updateOptionText = (index, e) => {
    const updatedOptions = [...question.options];
    updatedOptions[index] = { text: e.target.value };
    setQuestion({ ...question, options: updatedOptions });
  };

  const addOption = () => {
    const updatedOptions = [...question.options, { text: "" }];
    setQuestion({ ...question, options: updatedOptions });
  };

  const removeOption = (index) => {
    if (question.options.length <= 2) {
      return;
    }

    let newCorrectIndex = question.correctOptionIndex;
    if (index === question.correctOptionIndex) {
      newCorrectIndex = 0;
    } else if (index < question.correctOptionIndex) {
      newCorrectIndex--;
    }

    const updatedOptions = question.options.filter((_, i) => i !== index);
    setQuestion({
      ...question,
      options: updatedOptions,
      correctOptionIndex: newCorrectIndex,
    });
  };

  const setCorrectOption = (index) => {
    setQuestion({
      ...question,
      correctOptionIndex: index,
    });
  };

  return {
    updateOptionText,
    addOption,
    removeOption,
    setCorrectOption,
  };
};
