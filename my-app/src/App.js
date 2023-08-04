import './App.css';
import { useState } from "react"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";


function App() {
  
    return (
      <Router>
        <NavBar />
        <Routes>
          <Route index element={<HomePage />} />
        </Routes>
      </Router>
    )

  
}

export default App;
