import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const options = ['Writing', 'Speaking', 'Listening', 'Reading'];

function Sidebar({ onSelect }) {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    navigate('/'); 
  };

  return (
    <div className="w-64 bg-red-800 text-white p-4 flex flex-col">
      <div className="mb-6 p-3 bg-red-900 rounded text-center font-bold">
        {username ? `Xin chào, ${username}` : 'Chưa đăng nhập'}
      </div>
      {['Thi thử', 'Chatbot'].map((item) => (
        <div key={item} className="relative mb-4">
          <button
            onMouseEnter={() => setHovered(item)}
            onMouseLeave={() => setHovered(null)}
            className="w-full py-2 px-4 bg-red-700 hover:bg-gray-600 rounded"
          >
            {item}
          </button>
          {hovered === item && (
            <div
              className="absolute left-full top-0 ml-0 bg-gray-700 rounded shadow-lg"
              onMouseEnter={() => setHovered(item)}
              onMouseLeave={() => setHovered(null)}
            >
              {options.map((opt) => (
                <button
                  key={opt}
                  className="block w-full px-4 py-2 hover:bg-red-600 text-left"
                  onClick={() => onSelect(`${item} - ${opt}`)}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
      
      <button
        className="mt-auto w-full py-2 px-4 bg-gray-600 hover:bg-red-600 rounded"
        onClick={handleLogout}
      >
        Đăng xuất
      </button>
    </div>
  );
}

export default Sidebar;