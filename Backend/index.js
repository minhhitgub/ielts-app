require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { Pool } = require('pg');

console.log("Gemini API key:", process.env.GEMINI_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY; 
const genAI = new GoogleGenerativeAI(API_KEY);

const DBPASS = process.env.DB_PASS; 


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ielts_app',
  password: DBPASS, 
  port: 5432,
});

app.get('/api/tests', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tests ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/questions/:testId', async (req, res) => {
  const { testId } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM questions WHERE test_id = $1 ORDER BY question_number',
      [testId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2',
      [username, password]
    );
    if (result.rows.length > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  console.log('Register:', username, password); 
  try {
    
    const check = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (check.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }
    
    await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2)',
      [username, password]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});



app.post('/ask-gemini', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'No messages provided' });
    }
    
    const geminiMessages = messages.map(msg => ({
      role: msg.role === 'bot' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent({ contents: geminiMessages });
    const text = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini";
    res.json({ text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.toString() });
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});