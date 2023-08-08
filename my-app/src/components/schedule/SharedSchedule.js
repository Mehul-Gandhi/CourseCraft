import React, { useState } from 'react';
import Banner from '../Banner';
import LoginButton from '../login/LoginButton';
import LogoutButton from '../login/LogoutButton';

import Button from '../buttons/Button';
import placeholder from '../../assets/placeholder.png'; 

import DownloadIcon from '@mui/icons-material/Download';

import { handleLoginSuccess, handleLoginFailure, handleLogout } from '../login/helpers';
import "../../index.css";

function SharedSchedule() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const text = "Welcome to Course Logistics.AI, a course\
   schedule generator dedicated for UC Berkeley Computer\
    Science and Data Science classes.";
 
  const handleClick = () => {
    console.log('Button clicked');
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
          onSuccess={(credentialResponse) => handleLoginSuccess(credentialResponse, setIsLoggedIn, setUserProfile)}
          onFailure={handleLoginFailure}
          cookiePolicy="single_host_origin"
        />
      )}
      
      <Banner text={text}/>
      <div className="text-white text-md">{course} {semester} table generated at {time}</div>
      
      <img src={placeholder} alt="Placeholder 2024" className="mx-auto md:w-75 h-auto"/>


      <div className="flex justify-center items-center">
        <Button onClick={handleClick} icon={<DownloadIcon />} text={"Download master calendar .ics"}/>
      </div>
    </div>
  );
}

export default SharedSchedule;
