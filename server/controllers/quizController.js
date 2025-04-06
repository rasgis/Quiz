const Quiz = require("../models/Quiz");

// Получаем тест из базы данных
// У нас всегда только один тест, поэтому findOne без параметров
exports.getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findOne();

    if (!quiz) {
      return res.status(404).json({ message: "Тест не найден" });
    }

    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};

// Обновляем заголовок и вопросы теста
// Нужно для сохранения всех изменений сразу
exports.updateQuiz = async (req, res) => {
  try {
    const { title, questions } = req.body;

    let quiz = await Quiz.findOne();
    if (!quiz) {
      return res.status(404).json({ message: "Тест не найден" });
    }

    // Обновляем данные и сохраняем
    quiz.title = title;
    quiz.questions = questions;
    await quiz.save();

    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};

// Добавляем новый вопрос в тест
// text - текст вопроса
// options - массив вариантов ответа
// correctOptionIndex - индекс правильного ответа (начинается с 0)
exports.addQuestion = async (req, res) => {
  try {
    const { text, options, correctOptionIndex } = req.body;

    let quiz = await Quiz.findOne();
    if (!quiz) {
      return res.status(404).json({ message: "Тест не найден" });
    }

    // Добавляем вопрос в конец массива
    quiz.questions.push({
      text,
      options,
      correctOptionIndex,
    });

    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};

// Редактируем существующий вопрос
// Находим вопрос по id и обновляем его данные
exports.updateQuestion = async (req, res) => {
  try {
    const { questionId, text, options, correctOptionIndex } = req.body;

    let quiz = await Quiz.findOne();
    if (!quiz) {
      return res.status(404).json({ message: "Тест не найден" });
    }

    // Ищем вопрос по id в массиве
    const questionIndex = quiz.questions.findIndex(
      (q) => q._id.toString() === questionId
    );

    if (questionIndex === -1) {
      return res.status(404).json({ message: "Вопрос не найден" });
    }

    // Обновляем данные вопроса
    quiz.questions[questionIndex].text = text;
    quiz.questions[questionIndex].options = options;
    quiz.questions[questionIndex].correctOptionIndex = correctOptionIndex;

    await quiz.save();
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};

// Удаляем вопрос из теста по его id
// Проверяем чтобы остался хотя бы 1 вопрос
exports.deleteQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;

    let quiz = await Quiz.findOne();
    if (!quiz) {
      return res.status(404).json({ message: "Тест не найден" });
    }

    // Нельзя удалить последний вопрос
    if (quiz.questions.length <= 1) {
      return res
        .status(400)
        .json({ message: "Тест должен содержать минимум один вопрос" });
    }

    // Фильтруем массив, убирая нужный вопрос
    quiz.questions = quiz.questions.filter(
      (q) => q._id.toString() !== questionId
    );

    await quiz.save();
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};
