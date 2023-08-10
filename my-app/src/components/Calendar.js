import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import LoginButton from './login/LoginButton';
import LogoutButton from './login/LogoutButton';

import Button from './buttons/Button';
import placeholder from './../assets/calendar.png'; 
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GoogleIcon from '@mui/icons-material/Google';
import TaskIcon from '@mui/icons-material/Task';
import { useLocation, useNavigate } from 'react-router-dom';

import { handleLoginSuccess, handleLoginFailure, handleLogout } from './login/helpers';
import "./../index.css";

export default function Calendar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showEditor, setShowEditor] = useState(false); // New state variable
  const text = "Populate your personal Google Calendar with all the events.";
  const [displayedText, setDisplayedText] = useState("");
  const [startTyping, setStartTyping] = useState(true);
  const location = useLocation();
  var { uploadData, department, semester, year } = location.state;
  const time = "4:10pm";
  const fullText = `${department} ${semester} ${year} table generated at ${time}`;



  const navigate = useNavigate();

//   var { uploadData, department, semester, year } = location.state;

//   console.log(uploadData);
  
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

  useEffect(() => {
    let i = 0;
    if (startTyping && i < fullText.length) {
      const typingInterval = setInterval(() => {
        if (i < fullText.length) {
          setDisplayedText((prevText) => prevText + fullText.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 30);
      return () => clearInterval(typingInterval);
    }
  }, [startTyping]);

  

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
      <div className="font-bold text-white text-md">{displayedText}</div>
      
      {showEditor && <select value={language} onChange={handleLanguageChange}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
        <option value="markdown">Markdown</option>
      </select>}

      <div className="flex justify-center items-center space-x-5" style={{padding: "25px"}}>
    <div className="container flex flex-col justify-center items-center" style={{ width: '100%', maxWidth: '1280px', marginRight: 'auto', marginLeft: 'auto', backgroundColor: "#FFFFFF" }}>
        <h2>Google Calendar:</h2>
        <p>Lecture • Lab • Discussion</p>
        <Button onClick={handleClick} icon={<CalendarMonthIcon />} text={"Populate Google Calendar"}/>
    </div>
    <div className="container flex flex-col justify-center items-center" style={{backgroundColor: "#FFFFFF"}}>
        <h2>Google Tasks:</h2>
        <p>Assignments • Exams</p>
        <Button onClick={handleClick} icon={<TaskIcon />} text={"Populate Google Tasks"}/>
    </div>
</div>

      <iframe className="mx-auto md:w-75" src="https://calendar.google.com/calendar/embed?src=c_9f19d8848dd91d206f5fe65f50d697e178ec7e73ae93f6204d21b565a305c83e%40group.calendar.google.com&ctz=America%2FLos_Angeles"  width="800" height="600" frameborder="0" scrolling="no" style={{margin: "25px"}}></iframe>


      
    </div>
  );
}

