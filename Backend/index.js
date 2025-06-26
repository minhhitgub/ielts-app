const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "AIzaSyCWcvfnMWjzWNmKJByF_Gu8ZrVdrTLsvGE"; // Replace with your Gemini API key
const genAI = new GoogleGenerativeAI(API_KEY);

app.post('/ask-gemini', async (req, res) => {
  try {
    const { prompt } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
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