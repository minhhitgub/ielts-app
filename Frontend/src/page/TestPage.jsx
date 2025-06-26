import React from 'react';
import { useParams } from 'react-router-dom';

function TestPage() {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Làm bài thi {id}</h1>
      <p>Trang làm bài sẽ được hiển thị ở đây.</p>
    </div>
  );
}

export default TestPage;
