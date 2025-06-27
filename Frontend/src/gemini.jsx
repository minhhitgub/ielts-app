export async function askGemini(messages) {
  try {
    const response = await fetch('http://localhost:5000/ask-gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }), // Gửi đúng key messages
    });
    const data = await response.json();
    return data.text || "No response from Gemini";
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Error: Unable to get response from Gemini.";
  }
}