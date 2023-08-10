import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Upload from "./components/Upload";
import NavBar from "./components/NavBar";
import Instructions from "./components/Instructions";
import CompareSchedule from "./components/schedule/CompareSchedule";
import SharedSchedule from "./components/schedule/SharedSchedule";
import LandingPage from "./components/LandingPage";
import NotFound from "./components/NotFound"; // Don't forget to import this too.
import Calendar from "./components/Calendar";

function App() {
     

    return (
      <Router>
        {/* <NavBar /> */}
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/help" element={<Instructions />} />
          <Route path="/schedule" element={<CompareSchedule />} />
          <Route path="/shared" element= {<SharedSchedule />} />
          <Route path="*" element={<NotFound />} /> {/* This route will catch all unmatched routes */}
          <Route path="/calendar" element={<Calendar />} /> 
        </Routes>
      </Router>
    )
}

export default App;
