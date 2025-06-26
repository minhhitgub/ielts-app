import React from 'react';
import { useNavigate } from 'react-router-dom';
import AIChat from './AIChat';

function Content({ selected }) {
  const navigate = useNavigate();

  // Giả lập danh sách bài thi
  const mockTests = [
    { id: 1, title: 'Đề 1 - Writing' },
    { id: 2, title: 'Đề 2 - Writing' },
    { id: 3, title: 'Đề 3 - Writing' }
  ];

  // Chỉ hiển thị khi chọn "Thi thử - X"
  if (selected && selected.startsWith('Thi thử')) {
    return (
      <div className="flex-1 p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-red-500">Danh sách bài thi: {selected.split(' - ')[1]}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockTests.map((test) => (
            <div
              key={test.id}
              className="bg-white shadow p-4 rounded cursor-pointer hover:bg-blue-100 transition"
              onClick={() => navigate(`/test/${test.id}`)}
            >
              <h3 className="text-lg font-semibold text-red-500">{test.title}</h3>
              <p className="text-red-600">Click để làm bài</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (selected && selected.startsWith('Chatbot')) {
    return (
      <div className="flex-1 p-6 bg-gray-50">
        <AIChat/>
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
