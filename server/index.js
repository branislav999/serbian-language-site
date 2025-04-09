const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const lessonRoutes = require('./routes/lessons');
app.use('/lessons', lessonRoutes);

const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

const quizRoutes = require('./routes/quizzes');
app.use('/quizzes', quizRoutes);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
