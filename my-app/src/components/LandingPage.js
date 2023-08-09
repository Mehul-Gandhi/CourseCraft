import React, { useState } from 'react';
import UploadButton from './UploadButton';
import Banner from './Banner';
import LoginButton from './login/LoginButton';
import LogoutButton from './login/LogoutButton';
import ClassWebsiteInput from './ClassWebsiteInput'
import CourseWebsiteInput from './CourseWebsiteInput';
import Button from './buttons/Button';
import FileUpload from './FileUpload';
import Instructions from "./Instructions"

import CheckIcon from '@mui/icons-material/Check';

import { handleLoginSuccess, handleLoginFailure, handleLogout } from './login/helpers';
import "../index.css";
import NavBar from "./NavBar"

export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [uploadData, setUploadData] = useState([]);

  const text = "Welcome to Course Logistics.AI, a course schedule\
   generator dedicated for UC Berkeley Computer Science and Data \
   Science classes.";

   const getRequest = async () => {
    // Assuming the ID is hardcoded as '1234' for this example.
    const id = '1234';
  
    try {
      const response = await fetch(`http://localhost:3001/getData/${id}`);
  
      if (!response.ok) {
        throw new Error('Server responded with a non-200 status');
      }
  
      const data = await response.json();
  
      console.log('Received data:', data);
      // Optionally, set this data to the state or do something else with it.
  
    } catch (err) {
      console.error('There was an error fetching data:', err);
    }
  };
  

  const handleClick = async () => {
    console.log('Button clicked');
  
    // Dummy data
    const postData = {
      ID: '1234',
      OldSchedule: 'SampleOldSchedule.txt',
      NewSchedule: 'SampleNewSchedule.txt',
      Code: 'CS101',
      Semester: 'Spring 2023',
      Department: 'CS',
      Time: new Date(),
      MasterCalendar: 'SampleMasterCalendar.ics',
      Files: uploadData
    };
  
    try {
      const response = await fetch('http://localhost:3001/addLogistics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send data.');
      }
  
      console.log(data);
    } catch (err) {
      console.error('There was an error:', err);
    }
  };
  
  return (
    <div className="App flex flex-col justify-center items-center w-full">
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
        <Instructions />


      <div className="flex justify-center items-center space-x-4" style={{margin: "25px"}}>
        <Button onClick={handleClick} icon={<CheckIcon />} text={"Confirm"}/>
        <Button onClick={getRequest} icon={<CheckIcon />} text={"Get Request"}/>

      </div> 
    </div>
  );
}

