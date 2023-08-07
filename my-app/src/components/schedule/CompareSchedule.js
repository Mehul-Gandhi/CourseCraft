import React, { useState, useEffect } from 'react';
import Banner from '../Banner';


import Button from '../buttons/Button';
import UpdateButton from '../buttons/UpdateButton'
import RegenerateButton from "../buttons/RegenerateButton"

import TimeLine from '../TimeLine';
import "../../index.css";
import placeholder from '../../assets/placeholder.png'; 
import CheckIcon from '@mui/icons-material/Check';
import UpdateIcon from '@mui/icons-material/Update';

function CompareSchedule() {
  const [confirmClicked, setConfirmClicked] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  
  const fullText = "What would you like to update about the new calendar?";
  const text = "Update the new schedule with custom modifications or confirm the new schedule.";

  const handleClick = () => {
    console.log('Button clicked');
  };

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
      <Banner text={text}/>
      <TimeLine />
      <div className="flex flex-wrap justify-around md:justify-center p-4 md:space-x-10">
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <h1 className="text-[#FFB81C] text-center">Spring 2023 Input Schedule</h1>
          <img src={placeholder} alt="Placeholder 2023" className="mx-auto md:w-75 h-auto"/>
        </div>
        
        <div className="w-full md:w-auto">
          <h1 className="text-[#FFB81C] text-center">Spring 2024 Generated Schedule</h1>
          <img src={placeholder} alt="Placeholder 2024" className="mx-auto md:w-75 h-auto"/>
        </div>
      </div>
      
      <div className="flex justify-center space-x-4 m-4 md:m-50">
      <Button onClick={handleClick} icon={<UpdateIcon />} text={"Update"}/>
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
