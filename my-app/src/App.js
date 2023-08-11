import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Upload from "./components/Upload";
// import NavBar from "./components/NavBar";
// import Instructions from "./components/Instructions";
import CompareSchedule from "./components/schedule/CompareSchedule";
// import SharedSchedule from "./components/schedule/SharedSchedule";
import LandingPage from "./components/LandingPage";
import NotFound from "./components/NotFound"; 
// import Calendar from "./components/Calendar";
import { useEffect } from "react";

function App() {
     
    useEffect(() => {
      document.body.style.backgroundColor = '#003262';
      return () => {  // Reset to default when component unmounts
          document.body.style.backgroundColor = null;
      }
  }, []); //ENSURES BLUE BACKGROUND EVERYWHERE

    return (
      <Router>
        {/* <NavBar /> */}
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/schedule" element={<CompareSchedule />} />
          {/* <Route path="/shared" element={<SharedSchedule />} />
          <Route path="/calendar" element={<Calendar />} /> */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    )
}

export default App;
