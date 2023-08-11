import React, { useState, useEffect, useRef } from 'react';
import Banner from '../Banner';

import LinkIcon from '@mui/icons-material/Link';
import Button from '../buttons/Button';
import placeholder from '../../assets/placeholder.png'; 
import CodeEditor from '../website/AceEditor';

import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GoogleIcon from '@mui/icons-material/Google';
import CodeIcon from '@mui/icons-material/Code';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';

import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import axios from 'axios'

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import "../../index.css";

function SharedSchedule() {
  const [showEditor, setShowEditor] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [startTyping, setStartTyping] = useState(true);
  const [copySuccess, setCopySuccess] = useState('');  // New state for copy success message
  const [copyKeySuccess, setCopyKeySuccess] = useState(false);
  const keyTextareaRef = useRef(null);
  


useEffect(() => {
  function handleDocumentCopy(event) {
      navigator.clipboard.readText()
          .then(clipboardContent => {
              if (clipboardContent !== key) {
                  setCopyKeySuccess(false);  // Reset the copyKeySuccess state if copied content is not the shared key
              }
          })
          .catch(err => {
              console.error('Failed to read clipboard:', err);
          });
  }
  // Attach the event listener
  document.addEventListener('copy', handleDocumentCopy);

  // Cleanup: remove the event listener when the component unmounts
  return () => {
      document.removeEventListener('copy', handleDocumentCopy);
  };
}, [key]);


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
  const iRef = useRef(-1);

  const fullTextArray = [
  `C${department} Table generated at: ${time}`,
  `CClass Website: ${classWebsite}`,
  `CCourse Website: ${courseWebsite}`
];

const [displayedLines, setDisplayedLines] = useState(Array(fullTextArray.length).fill(''));

useEffect(() => {
  if (startTyping) {
    const intervals = [];

    fullTextArray.forEach((text, lineIndex) => {
      let charIndex = 0;

      const interval = setInterval(() => {
        if (charIndex < text.length) {
          setDisplayedLines(prevLines => {
            const newLines = [...prevLines];
            newLines[lineIndex] += text.charAt(charIndex);
            return newLines;
          });
          charIndex++;
        } else {
          clearInterval(interval);
        }
      }, 30);

      intervals.push(interval);
    });

    return () => intervals.forEach(interval => clearInterval(interval));
  }
}, [startTyping]);


  const [language, setLanguage] = useState("javascript");
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  }
  
  // const generateCalendar = () => {
  //   navigate("/calendar", { state: { uploadData, department, semester, year } });
  // }

  const generateCalendar = async () => {
    navigate("/calendar", { state: { uploadData, department, semester, year } });
}


  const handleEditorToggle = () => {
    setShowEditor(!showEditor);
  };

  const navigateBack = () => {
    window.history.back();
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(key);
    setCopySuccess('Key Copied!');
  };
  
  useEffect(() => {
    function handleDocumentCopy(event) {
      // Read the copied content from the clipboard
      navigator.clipboard.readText()
        .then(clipboardContent => {
          if (clipboardContent !== key) {
            setCopySuccess(false);  // Reset the copySuccess state if copied content is not the key
          }
        })
        .catch(err => {
          console.error('Failed to read clipboard:', err);
        });
    }
  
    // Attach the event listener
    document.addEventListener('copy', handleDocumentCopy);
  
    // Cleanup: remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('copy', handleDocumentCopy);
    };
  }, [key]);
  


  return (
    <div className="App container">

      <Button onClick={navigateBack} icon={<ArrowBackIcon />} text={"Back"}/>
      <Banner text={"Congratulations! Your new schedule has been generated. Copy the key to share this generated calendar with others. Now export the calendar in the format of your choosing!"}/>

      <div className="font-weight-bold text-white">
      <h3>
  <LinkIcon className="mr-2" style={{margin: "5px"}}/> 
   Shared key: 
  <span style={{color: "#FFB81C"}}> {key}</span>
</h3>        

      <button 
        onClick={handleCopy} 
        className="btn btn-custom mt-2"
        
      >
        {copySuccess ? <> <CheckIcon /> Copied </> : "Copy Code"}
      </button>

        <Tooltip title={
            <div className="text-medium">
            Share this key with your staff members to export the Google Calendar and Tasks.
            </div>
            }>
            <InfoOutlinedIcon fontSize="medium" style={{ marginLeft: '5px', cursor: 'pointer' }} />
          </Tooltip>

        
      </div>

      <div className="font-weight-bold text-white">
  {displayedLines.map((line, index) => (
    <div key={index}>{line}</div>
  ))}
</div> 
    {showEditor && 
      <select 
        value={language} 
        onChange={handleLanguageChange} 
        className="form-select form-select-sm custom-select-smaller"
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
        <option value="markdown">Markdown</option>
      </select>
    }
      
      {showEditor ? <CodeEditor language={language} code={newCode} /> : 
      <div className="d-flex flex-column align-items-center" style= {{paddingRight: "30px"}}>
      <div className="text-white table-responsive overflow-auto" style={{backgroundColor: "white", maxHeight: '500px', maxWidth: "90%"}} dangerouslySetInnerHTML={{ __html: newCode }} />
      <h1 className="text-warning text-center mt-2.5">{department} {semester} {year} Generated Schedule</h1>
  </div>
      
      }

<div className="d-flex justify-content-center my-4">
    <div className="pe-4">
    <Button 
        onClick={() => {window.open("https://drive.google.com/uc?export=download&id=1-PJK4qgJEKgGdwtTWVXbK9G3sWQs3FZ_", '_blank')}} 
        icon={<DownloadIcon />} 
        text={"Download master calendar .ics"} 
        className="btn btn-secondary mr-3"
    />
    </div>
    <div className="pe-4">
    <Button 
        onClick={generateCalendar} 
        icon={<GoogleIcon />} 
        text={"Google Calendar & Role-based Google Tasks"} 
        className="btn btn-secondary mr-3"
    />
    </div>
    <div className="pe-4">
    <Button 
        onClick={handleEditorToggle} 
        icon={showEditor ? <CalendarMonthIcon /> : <CodeIcon />} 
        text={showEditor ? "HTML Calendar" : "Website Code"}
        className="btn btn-secondary"
    />
    </div>
</div>
    </div>
);
}

export default SharedSchedule;
