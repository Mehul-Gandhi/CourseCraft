import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import LoginButton from './login/LoginButton';
import LogoutButton from './login/LogoutButton';

import Button from './buttons/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GoogleIcon from '@mui/icons-material/Google';
import TaskIcon from '@mui/icons-material/Task';
import { useLocation, useNavigate } from 'react-router-dom';

import { handleLoginSuccess, handleLoginFailure, handleLogout } from './login/helpers';
import "./../index.css";

export default function Calendar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showEditor, setShowEditor] = useState(false); // New state variable
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  
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

  const navigateBack = () => {
    window.history.back()
  }

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
            <div className="w-full flex flex-row justify-between items-center px-4 py-2">
      <Button onClick={navigateBack} icon={<ArrowBackIcon />} text={"Back"} />
      {isLoggedIn ? (
        <LogoutButton onLogout={() => handleLogout(setIsLoggedIn)} />
      ) : (
        <LoginButton
          onSuccess={(credentialResponse) => handleLoginSuccess(credentialResponse, setIsLoggedIn, setUserProfile)}
          onFailure={handleLoginFailure}
          cookiePolicy="single_host_origin"
        />
      )}
      </div>
      
      
      <Banner text={text}/>
      <div className="font-bold text-white text-md">{displayedText}</div>
      
      {showEditor && <select value={language} onChange={handleLanguageChange}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
        <option value="markdown">Markdown</option>
      </select>}

      <div className="flex justify-center items-center space-x-5 px-6 py-4">
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md max-w-lg flex flex-col justify-between"> {/* Added flex and flex-col here */}
          <div>
            <h2 className="text-center mb-4">Google Calendar:</h2>
            <p className="text-center mb-4">Lecture • Lab • Discussion</p>
          </div>
          <Button onClick={handleClick} icon={<CalendarMonthIcon />} text={"Populate Google Calendar"} className="whitespace-nowrap"/> {/* Added whitespace-nowrap here */}
        </div>
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md max-w-lg flex flex-col justify-between"> {/* Added flex and flex-col here */}
          <div>
            <h2 className="text-center mb-4">Google Tasks:</h2>
            <p className="text-center mb-4">Assignments • Exams</p>
          </div>
          <Button onClick={handleClick} icon={<TaskIcon />} text={"Populate Google Tasks"} className="whitespace-nowrap"/> {/* Added whitespace-nowrap here */}
        </div>
      </div>

      <iframe className="mx-auto md:w-75" src="https://calendar.google.com/calendar/embed?src=c_9f19d8848dd91d206f5fe65f50d697e178ec7e73ae93f6204d21b565a305c83e%40group.calendar.google.com&ctz=America%2FLos_Angeles"  width="800" height="600" frameborder="0" scrolling="no" style={{margin: "25px"}}></iframe>


      
    </div>
  );
}

