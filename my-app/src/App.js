import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Pages/Home';
import MultiplicationKing from './Pages/MultiplicationKing';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/MultiplicationKing" element={<MultiplicationKing />} />
      </Routes>
    </>
  );
}

export default App;
