import { StrictMode, useState } from 'react'
import './App.css'
import IeltsApp from './component/IELTSAPP.jsx'
import SearchBar from './component/SearchBar.jsx'
import Home from './page/Home.jsx'
import UserPage from './page/UserPage.jsx'
import TestPage from './page/TestPage.jsx'
import PrivateRoute from './component/PrivateRoute.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/userpage"
          element={
            <PrivateRoute>
              <UserPage />
            </PrivateRoute>
          }
        /> 
        <Route
          path="/test/:id"
          element={
            <PrivateRoute>
              <TestPage />
            </PrivateRoute>
          }
        /> 
      </Routes>
    </BrowserRouter>
    
  );
}

export default App