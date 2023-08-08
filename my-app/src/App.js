import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import Instructions from "./components/Instructions";
import CompareSchedule from "./components/schedule/CompareSchedule";
import SharedSchedule from "./components/schedule/SharedSchedule";


function App() {
    return (
      <Router>
        <NavBar />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/help" element={<Instructions />} />
          <Route path="/schedule" element={<CompareSchedule />} />
          {/* <Route path="/taskdoc" element={<TaskDoc />} />  */}
          <Route path="/shared" element= {<SharedSchedule />} />

        </Routes>
      </Router>
    )

  
}

export default App;
