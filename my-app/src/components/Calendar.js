import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import LoginButton from './login/LoginButton';

import Button from './buttons/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GoogleIcon from '@mui/icons-material/Google';
import TaskIcon from '@mui/icons-material/Task';
import { useLocation, useNavigate } from 'react-router-dom';

import { handleLoginSuccess, handleLoginFailure, handleLogout } from './login/helpers';
import "./../index.css";

import axios from 'axios'

export default function Calendar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showEditor, setShowEditor] = useState(false); // New state variable
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  
  const text = "Populate your personal Google Calendar with all the events.";
  const [displayedText, setDisplayedText] = useState("");
  const [startTyping, setStartTyping] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
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

  const handleClick = async () => {

    
    if (!userProfile) {
      setErrorMessage("Please Login to Google First.");
      return;
    }
    alert('Google Tasks generated!');
  };

  const generateCalendar = async () => {
    // Call the Flask API
    if (!userProfile) {
      setErrorMessage("Please Login to Google First.");
      return;
    }
    try { 
        const response = await axios.post('http://localhost:5000/export-to-calendar');

        if (response.data.message === "Success") {
            alert("Successfully exported to calendar");
            
            // Continue with the navigation if the API call is successful
            navigate("/calendar", { state: { uploadData, department, semester, year } });
        } else {
            console.error("Failed to export to calendar:", response.data.message);
            alert("Error exporting calendar.")
        }
    } catch (error) {
        console.error("Error exporting to calendar:", error);
        alert("Error exporting calendar.")
    }
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
    <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center px-4 py-2">
            <Button onClick={navigateBack} icon={<ArrowBackIcon />} text={"Back"} />
            {isLoggedIn ? (
                <Button 
                    onClick= { () => {
                        handleLogout(setIsLoggedIn);
                        setUserProfile("");
                    }} 
                    icon={<LogoutIcon />}
                    text="Logout"
                    iconBefore={false}
                />
            ) : (
                <LoginButton
                    onSuccess={(credentialResponse) => {
                        handleLoginSuccess(credentialResponse, setIsLoggedIn, setUserProfile);
                        setErrorMessage("")
                    }}
                    onFailure={handleLoginFailure}
                    cookiePolicy="single_host_origin"
                />
            )}
        </div>
        
        <Banner text={text}/>
        <div className="d-flex justify-content-center align-items-center">

        <div className="font-weight-bold text-white my-2">{displayedText}</div>
        </div>
        
        {showEditor && 
            <select className="form-select" value={language} onChange={handleLanguageChange}>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="html">HTML</option>
                <option value="markdown">Markdown</option>
            </select>
        }

        <div className="d-flex justify-content-center align-items-center mt-4 gap-4">
        <div className="bg-white p-4 rounded shadow-sm text-center">

                <h2 className="mb-3">Google Calendar:</h2>
                <p className="mb-3">Lecture • Lab • Discussion</p>
                <Button onClick={generateCalendar} icon={<CalendarMonthIcon />} text={"Populate Google Calendar"} />
            </div>
            <div className="bg-white p-4 rounded shadow-sm text-center">

                <h2 className="mb-3">Google Tasks:</h2>
                <p className="mb-3">Assignments • Exams</p>
                <Button onClick={handleClick} icon={<TaskIcon />} text={"Populate Google Tasks"} />
            </div>
        </div>

        <div className="d-flex justify-content-center align-items-center">
    <p className="text-danger mt-2">{errorMessage}</p>
</div>
        <iframe className="mx-auto d-block w-100" title="Google Calendar Placeholder" style={{maxWidth: "800px", height: "600px", margin: "25px 0"}} src="https://calendar.google.com/calendar/embed?src=c_9f19d8848dd91d206f5fe65f50d697e178ec7e73ae93f6204d21b565a305c83e%40group.calendar.google.com&ctz=America%2FLos_Angeles" frameborder="0" scrolling="no"></iframe>
    </div>
);
}

