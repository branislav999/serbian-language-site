const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const getAllLessons = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM lessons ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error('Error getting lessons:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

const getLessonById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM lessons WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error getting lesson:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllLessons,
  getLessonById,
};
