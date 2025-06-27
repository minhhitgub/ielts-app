import React, { useEffect, useState } from 'react';
import TestQuestion from '../component/TestQuestion.jsx';
import { useParams } from 'react-router-dom';

function TestPage() {
  const [questions, setQuestions] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/api/questions/${id}`)
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, [id]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-bold mb-6">Sample Test</h2>
      <TestQuestion questions={questions} />
    </div>
  );
}

export default TestPage;