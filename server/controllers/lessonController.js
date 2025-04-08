const { pool } = require('./db');

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
