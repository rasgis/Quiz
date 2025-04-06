const Quiz = require("./Quiz");

async function createDefaultQuiz() {
  try {
    const existingQuiz = await Quiz.findOne();

    if (existingQuiz) {
      return;
    }

    const defaultQuiz = new Quiz({
      title: "Тест знаний",
      questions: [
        {
          text: "Столица России?",
          options: [
            { text: "Москва" },
            { text: "Санкт-Петербург" },
            { text: "Новосибирск" },
            { text: "Екатеринбург" },
          ],
          correctOptionIndex: 0,
        },
        {
          text: "Самая длинная река в мире?",
          options: [
            { text: "Амазонка" },
            { text: "Нил" },
            { text: "Янцзы" },
            { text: "Миссисипи" },
          ],
          correctOptionIndex: 1,
        },
        {
          text: 'Автор романа "Война и мир"?',
          options: [
            { text: "Федор Достоевский" },
            { text: "Лев Толстой" },
            { text: "Антон Чехов" },
            { text: "Иван Тургенев" },
          ],
          correctOptionIndex: 1,
        },
      ],
    });

    await defaultQuiz.save();
    console.log("Квиз создан");
  } catch (error) {
    console.error("Ошибка при создании квиза:", error);
  }
}

createDefaultQuiz();
