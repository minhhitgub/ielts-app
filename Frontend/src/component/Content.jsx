import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AIChat from './AIChat';

function Content({ selected }) {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);

  useEffect(() => {
    // Lấy danh sách bài test từ backend
    fetch('http://localhost:5000/api/tests')
      .then(res => res.json())
      .then(data => setTests(data));
  }, []);

  if (selected && selected.startsWith('Thi thử')) {
    // Lấy section từ selected, ví dụ: "Thi thử - Reading" => "reading"
    const section = selected.split(' - ')[1]?.toLowerCase() || '';

    // Lọc các bài test theo section
    const filteredTests = tests.filter(test =>
      test.section?.toLowerCase() === section
    );

    return (
      <div className="flex-1 p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-red-500">
          Danh sách bài thi: {section.charAt(0).toUpperCase() + section.slice(1)}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTests.map((test) => (
            <div
              key={test.id}
              className="bg-white shadow p-4 rounded cursor-pointer hover:bg-blue-100 transition"
              onClick={() => navigate(`/test/${test.id}`)}
            >
              <h3 className="text-lg font-semibold text-red-500">{test.name}</h3>
              <p className="text-red-600">Click để làm bài</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (selected && selected.startsWith('Chatbot')) {
    const skill = selected.split(' - ')[1]?.toLowerCase() || '';
    return (
      <div className="flex-1 p-6 bg-gray-50">
        <AIChat skill={skill} />
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 bg-gray-50 flex items-center justify-center text-gray-400 text-lg">
      Vui lòng chọn một chức năng ở menu bên trái.
    </div>
  );
}

export default Content;