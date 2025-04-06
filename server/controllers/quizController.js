require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const getQuizByLesson = async (req, res) => {
  const { lessonId } = req.params;

  try {
    const result = await pool.query(
      'SELECT id, question, options FROM quizzes WHERE lesson_id = $1',
      [lessonId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching quiz:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

const submitQuiz = async (req, res) => {
  const { lessonId, answers } = req.body;

  try {
    const result = await pool.query(
      'SELECT id, correct_answer FROM quizzes WHERE lesson_id = $1',
      [lessonId]
    );

    const questions = result.rows;

    let score = 0;
    questions.forEach((question) => {
      const userAnswer = answers[question.id];
      if (userAnswer && userAnswer.toLowerCase() === question.correct_answer.toLowerCase()) {
        score++;
      }
    });

    res.json({ message: 'Quiz submitted', score, total: questions.length });
  } catch (err) {
    console.error('Error submitting quiz:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getQuizByLesson,
  submitQuiz,
};
