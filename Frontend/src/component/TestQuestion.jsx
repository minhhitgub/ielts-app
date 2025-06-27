import React, { useState, useEffect } from 'react';

function TestQuestion({ questions }) {
  const [answers, setAnswers] = useState({});
  const [shuffledChoices, setShuffledChoices] = useState({});

  

  const handleChange = (qid, value) => {
    setAnswers(prev => ({ ...prev, [qid]: value }));
  };

  return (
    <div className="space-y-8">
      {questions.map((q, idx) => (
        <div key={q.id || idx} className="p-4 text-black border rounded bg-white shadow">
          <div className="mb-3 font-semibold">{idx + 1}. {q.question}</div>
          {q.type === 'multiple_choice' && (
            <div className="space-y-2">
              {q.choices.map((choice, i) => (
                <label key={i} className="block">
                  <input
                    type="radio"
                    name={`q${q.id || idx}`}
                    value={choice}
                    checked={answers[q.id || idx] === choice}
                    onChange={() => handleChange(q.id || idx, choice)}
                    className="mr-2"
                  />
                  {choice}
                </label>
              ))}
            </div>
          )}

          {q.type === 'fill_in_words' && (
            <input
              type="text"
              className="border rounded px-2 py-1 w-64"
              placeholder="Your answer..."
              value={answers[q.id || idx] || ''}
              onChange={e => handleChange(q.id || idx, e.target.value)}
            />
          )}

          
        </div>
      ))}
    </div>
  );
}

export default TestQuestion;