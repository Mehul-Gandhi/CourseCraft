import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Instructions from "./components/Instructions";
import CompareSchedule from "./components/schedule/CompareSchedule";
import SharedSchedule from "./components/schedule/SharedSchedule";
import LandingPage from "./components/LandingPage";
import NotFound from "./components/NotFound"; // Don't forget to import this too.

function App() {
     

    return (
      <Router>
        {/* Conditionally render NavBar if the current location is not /404 */}
        <NavBar />
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/upload" element={<Home />} />
          <Route path="/help" element={<Instructions />} />
          <Route path="/schedule" element={<CompareSchedule />} />
          <Route path="/shared" element= {<SharedSchedule />} />
          <Route path="*" element={<NotFound />} /> {/* This route will catch all unmatched routes */}
        </Routes>
      </Router>
    )
}

export default App;
