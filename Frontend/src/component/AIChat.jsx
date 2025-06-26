import React, { useState } from 'react';
import { askGemini } from '../gemini';

function AIChat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    const botReply = await askGemini(input);
    const botMsg = { role: 'bot', text: botReply };

    setMessages(prev => [...prev, botMsg]);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full h-[90vh] flex flex-col bg-white rounded-none shadow-none p-4 overflow-hidden">
        <div className="flex-1 space-y-4 overflow-y-auto mb-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`${
                  msg.role === 'user'
                    ? 'bg-blue-100 text-black'
                    : 'bg-gray-100 text-black'
                } inline-block p-3 rounded-lg break-words`}
                style={{ textAlign: 'left', maxWidth: '80%' }}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center pt-2 bg-white">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 py-2 px-3 rounded-full text-black bg-gray-100 focus:outline-none"
            onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
          />
          <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded-full ml-3 hover:bg-blue-600">Send</button>
        </div>
      </div>
    </div>
  );
}

export default AIChat;