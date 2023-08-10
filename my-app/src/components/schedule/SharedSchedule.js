import React, { useState, useEffect } from 'react';
import Banner from '../Banner';
import LoginButton from '../login/LoginButton';
import LogoutButton from '../login/LogoutButton';
import LinkIcon from '@mui/icons-material/Link';
import Button from '../buttons/Button';
import placeholder from '../../assets/placeholder.png'; 
import CodeEditor from '../website/AceEditor';
import CheckIcon from '@mui/icons-material/Check';

import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GoogleIcon from '@mui/icons-material/Google';
import CodeIcon from '@mui/icons-material/Code';
import { useLocation, useNavigate } from 'react-router-dom';

import { handleLoginSuccess, handleLoginFailure, handleLogout } from '../login/helpers';
import "../../index.css";

function SharedSchedule() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [startTyping, setStartTyping] = useState(true);
  const [copySuccess, setCopySuccess] = useState('');  // New state for copy success message
  
  const location = useLocation();
  const navigate = useNavigate();
  
  var { key, classWebsite, courseWebsite, uploadData, department, semester, year, newCode } = location.state;

  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const formattedHours = hours > 12 ? hours - 12 : hours;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const amOrPm = hours >= 12 ? 'pm' : 'am';

  const time = `${formattedHours}:${formattedMinutes}${amOrPm}`;
  const fullText = `${department || "CS10" } ${semester || "Spring"} ${year || "2024"} table generated at ${time} ${classWebsite} ${courseWebsite}`;

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

  const [language, setLanguage] = useState("javascript");
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  }
  
  const generateCalendar = () => {
    navigate("/calendar", { state: { uploadData, department, semester, year } });
  }

  const handleEditorToggle = () => {
    setShowEditor(true);
  };

  const navigateBack = () => {
    window.history.back();
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(key)
      .then(() => {
        setCopySuccess('Key Copied!');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
        setCopySuccess('Failed to copy key!');
      });
  };

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

      <Button onClick={navigateBack} icon={<ArrowBackIcon />} text={"Back"}/>
      <Banner text={""}/>
      <div className="font-bold text-white text-md">
        <h1><LinkIcon /> Shared key: {key}</h1>
        <button onClick={handleCopy} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
          Copy Key
        </button>
        {copySuccess && <div style={{color: 'green'}}>{copySuccess}</div>}
      </div>
      
      <div className="font-bold text-white text-md">{displayedText}</div>
      
      {showEditor && <select value={language} onChange={handleLanguageChange}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
        <option value="markdown">Markdown</option>
      </select>}
      
      {showEditor ? <CodeEditor language={language} code={newCode} /> : <img src={placeholder} alt="Placeholder 2024" className="mx-auto md:w-75 h-auto"/>}

      <div className="flex justify-center items-center space-x-5" style={{padding: "25px"}}>
        <Button icon={<DownloadIcon />} text={"Download master calendar .ics"}/>
        <Button onClick={generateCalendar} icon={<GoogleIcon />} text={"Google Calendar & Role-based Google Tasks"}/>
        <Button onClick={handleEditorToggle} icon={<CodeIcon />} text={"Website Code"}/>
      </div>
    </div>
  );
}

export default SharedSchedule;
