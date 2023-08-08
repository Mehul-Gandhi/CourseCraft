import React, { useState } from 'react';
import Banner from '../Banner';
import LoginButton from '../login/LoginButton';
import LogoutButton from '../login/LogoutButton';

import Button from '../buttons/Button';
import placeholder from '../../assets/placeholder.png'; 
import CodeEditor from '../website/AceEditor'; // Ensure you import the CodeEditor component

import DownloadIcon from '@mui/icons-material/Download';
import GoogleIcon from '@mui/icons-material/Google';
import CodeIcon from '@mui/icons-material/Code';

import { handleLoginSuccess, handleLoginFailure, handleLogout } from '../login/helpers';
import "../../index.css";

function SharedSchedule() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showEditor, setShowEditor] = useState(false); // New state variable
  const text = "Welcome to Course Logistics.AI, a course schedule generator dedicated for UC Berkeley Computer Science and Data Science classes.";
  
  const [language, setLanguage] = useState("javascript"); // default language

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  }

  const handleClick = () => {
    console.log('Button clicked');
  };
  
  const handleEditorToggle = () => {
    setShowEditor(true);
  };
  
  const course = "CS10"; //query from the backend
  const semester = "Spring 2024";
  const time = "4:10pm";
  
  return (
    <div className="App">
      {isLoggedIn ? (
        <LogoutButton onLogout={() => handleLogout(setIsLoggedIn)} />
      ) : (
        <LoginButton
          onSuccess={(credentialResponse) => handleLoginSuccess(credentialResponse, setIsLoggedIn)}
          onFailure={handleLoginFailure}
          cookiePolicy="single_host_origin"
        />
      )}
      
      <Banner text={text}/>
      <div className="font-bold text-white text-md">{course} {semester} table generated at {time} </div>
      
      {showEditor && <select value={language} onChange={handleLanguageChange}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
        <option value="markdown">Markdown</option>
      </select>}

      {showEditor ? <CodeEditor language={language} /> : <img src={placeholder} alt="Placeholder 2024" className="mx-auto md:w-75 h-auto"/>}

      <div className="flex justify-center items-center space-x-5" style={{padding: "25px"}}>
        <Button onClick={handleClick} icon={<DownloadIcon />} text={"Download master calendar .ics"}/>
        <Button onClick={handleClick} icon={<GoogleIcon />} text={"Google Calendar & Role-based Google Tasks"}/>
        <Button onClick={handleEditorToggle} icon={<CodeIcon />} text={"Website Code"}/>
      </div>
    </div>
  );
}

export default SharedSchedule;
