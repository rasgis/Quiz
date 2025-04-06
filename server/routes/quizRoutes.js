const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");

router.get("/", quizController.getQuiz);

router.put("/", quizController.updateQuiz);

router.post("/question", quizController.addQuestion);

router.put("/question", quizController.updateQuestion);

router.delete("/question/:questionId", quizController.deleteQuestion);

module.exports = router;
