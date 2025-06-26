import { StrictMode, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import IeltsApp from './component/IELTSAPP.jsx'
import SearchBar from './component/SearchBar.jsx'
import Home from './page/Home.jsx'
import UserPage from './page/UserPage.jsx'
import TestPage from './page/TestPage.jsx'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/searchbar" element={<SearchBar w-60 h-18/>} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/test/:id" element={<TestPage />} /> 
      </Routes>
    </BrowserRouter>
    
  );
}

export default App
