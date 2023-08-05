import './App.css';
import { useState } from "react"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import Instructions from "./components/Instructions"


function App() {
  
    return (
      <Router>
        <NavBar />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="help" element={<Instructions />} />
        </Routes>
      </Router>
    )

  
}

export default App;
