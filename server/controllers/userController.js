require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: 'User registered', user: result.rows[0] });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  const { loginCredential, password } = req.body;

  try {
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1 OR username = $2', [loginCredential,loginCredential]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const user = userResult.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    res.json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ error: 'Server error' });
  }
};


const getUserProgress = async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await pool.query('SELECT progress FROM users WHERE id = $1', [id]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.json(result.rows[0].progress);
    } catch (err) {
      console.error('Error getting progress:', err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  const updateUserProgress = async (req, res) => {
    const { id } = req.params;
    const { progress } = req.body;
  
    try {
      await pool.query('UPDATE users SET progress = $1 WHERE id = $2', [progress, id]);
      res.json({ message: 'Progress updated' });
    } catch (err) {
      console.error('Error updating progress:', err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  

module.exports = {
  registerUser,
  loginUser,
  getUserProgress,
  updateUserProgress,
};
