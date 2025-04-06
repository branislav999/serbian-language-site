const express = require('express');
const router = express.Router();
const { getQuizByLesson, submitQuiz } = require('../controllers/quizController');

router.get('/lesson/:lessonId', getQuizByLesson);
router.post('/submit', submitQuiz);

module.exports = router;
