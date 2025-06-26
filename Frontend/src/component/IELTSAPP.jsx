import React from 'react';
import '../CSS/IELTSAPP.css'; // Chứa CSS riêng

function IeltsApp() {
    return (
    <div className="ielts-app">
      <header className="header">
        Ứng dụng luyện thi IELTS
      </header>

      <div className="skills-container">
        <div className="skill-box">Writing</div>
        <div className="skill-box">Speaking</div>
        <div className="skill-box">Listening</div>
        <div className="skill-box">Reading</div>
      </div>
    </div>
  );
}

export default IeltsApp;
