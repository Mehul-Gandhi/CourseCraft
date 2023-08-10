import React, { useState, useEffect } from 'react';
import Banner from '../Banner';


import Button from '../buttons/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import TimeLine from '../TimeLine';
import "../../index.css";
import placeholder from '../../assets/placeholder.png'; 
import CheckIcon from '@mui/icons-material/Check';
import UpdateIcon from '@mui/icons-material/Update';
import { useLocation, useNavigate } from 'react-router-dom';


function CompareSchedule() {
  const [confirmClicked, setConfirmClicked] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [oldSchedule, setOldSchedule] = useState('');
  const [newSchedule, setNewSchedule] = useState("");
 
  useEffect(() => {
    // Fetch the HTML file and set its content to the state
    fetch('./old_course.html')
      .then(response => response.text())
      .then(content => {
        setOldSchedule(content);
        console.log(content);
      });
  }, []);

  useEffect(() => {
    // Fetch the HTML file and set its content to the state
    fetch('./modified_course.html')
      .then(response => response.text())
      .then(content => {
        setNewSchedule(content);
        console.log(content);
      });
  }, []);
  
  const fullText = "What would you like to update about the new calendar?";
  const text = "Update the new schedule with custom modifications or confirm the new schedule.";
 
  const handleClick = () => {
    console.log('Button clicked');
    navigate("/shared", { state: { uploadData, department, semester, year } });
  };
  const location = useLocation();
  const navigate = useNavigate();

  const navigateBack = () => {
    window.history.back()
  }

  var { uploadData, department, semester, year } = location.state;

  useEffect(() => {
    let i = -1;
    if (confirmClicked && i < fullText.length) {
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
  }, [confirmClicked]);

  const handleUpdateClick = () => {
    setConfirmClicked(true);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div className="App w-full md:w-screen">
      <div className="w-full flex flex-row justify-between items-center px-4 py-2">
      <Button onClick={navigateBack} icon={<ArrowBackIcon />} text={"Back"} />

      </div>
      <Banner text={text}/>
      <TimeLine page={2}/>
      <div className="flex flex-wrap justify-around md:justify-center p-4 md:space-x-10">
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <h1 className="text-[#FFB81C] text-center">Spring 2023 Input Schedule</h1>
          <div className="text-white table-container" dangerouslySetInnerHTML={{ __html: newSchedule }} style={{backgroundColor: "white"}}/>
        </div>
        
        <div className="w-full md:w-auto">
          <h1 className="text-[#FFB81C] text-center">Spring 2024 Generated Schedule</h1>
          <div className="text-white" dangerouslySetInnerHTML={{ __html: newSchedule }} style={{backgroundColor: "white"}}/>
        </div>
      </div>
      
      <div className="flex justify-center space-x-4 m-4 md:m-50">
      <Button onClick={handleUpdateClick} icon={<UpdateIcon />} text={"Update"}/>
        <Button onClick={handleClick} icon={<CheckIcon />} text={"Confirm"}/>
      </div>

      {confirmClicked && (
        <div className="flex flex-col items-center justify-center" style={{padding: "50px"}}>
          <h2 className="text-[#FFB81C] mb-4">{displayedText}</h2>
          <textarea
            className="w-1/2 h-64 p-4 border-2 border-gray-600 rounded-lg overflow-auto resize-y"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Paste your text here"
          />
          <div style={{padding: "25px"}}>
           {confirmClicked && userInput.length > 0 && 
      <Button onClick={handleClick} icon={<CheckIcon />} text={"Confirm"}/>
      }
      </div>
        </div>
      )}
     
    </div>
  );
}

export default CompareSchedule;
