const express = require('express');
const router = express.Router();
const { getAllLessons, getLessonById } = require('../controllers/lessonController');

router.get('/', getAllLessons);

router.get('/:id', getLessonById);

module.exports = router;
