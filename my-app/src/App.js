import './App.css';
import { useState } from "react"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage';

function App() {
  
    return (
      <Router>
        <Routes>
          <Route index element={<HomePage />} />
        </Routes>
      </Router>
    )
}

export default App;
