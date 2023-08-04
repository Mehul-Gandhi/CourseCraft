import './App.css';
import { useState } from "react"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";


function App() {
  
    // return (
    //   <Router>
    //     <NavBar />
    //     <Routes>
    //       <Route index element={<HomePage />} />
    //     </Routes>
    //   </Router>
    // )
    return (
      <div className="App">
     <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
        <div class="md:flex">
            <div class="md:flex-shrink-0">
                <div class="p-8">
                    <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Card title</div>
                    <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Subheading</a>
                    <p class="mt-2 text-gray-500">This is an example of a Tailwind CSS card. This card doesn't contain images, only text and a button.</p>
                </div>
                <div class="p-8">
                    <button class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">Click me</button>
                </div>
            </div>
        </div>
    </div>
    </div>
    )
  
}

export default App;
