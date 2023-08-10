import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Upload from "./components/Upload";
import NavBar from "./components/NavBar";
import Instructions from "./components/Instructions";
import CompareSchedule from "./components/schedule/CompareSchedule";
import SharedSchedule from "./components/schedule/SharedSchedule";
import LandingPage from "./components/LandingPage";
import NotFound from "./components/NotFound"; // Don't forget to import this too.
import Calendar from "./components/Calendar";

import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';

const ExampleToast = ({ children }) => {
  const [show, toggleShow] = useState(true);

  return (
    <Toast show={show} onClose={() => toggleShow(!show)}>
      <Toast.Header>
        <strong className="mr-auto">React-Bootstrap</strong>
      </Toast.Header>
      <Toast.Body>{children}</Toast.Body>
    </Toast>
  );
};


const App = () => (
  <Container className="p-3">
    <Container className="p-5 mb-4 bg-light rounded-3">
      <h1 className="header">Welcome To React-Bootstrap</h1>
      <ExampleToast>
        We now have Toasts
        <span role="img" aria-label="tada">
          🎉
        </span>
      </ExampleToast>
    </Container>
  </Container>
);

export default App;
