import React, { useState } from 'react';
import UploadButton from './UploadButton';
import Banner from './Banner';
import LoginButton from './login/LoginButton';
import LogoutButton from './login/LogoutButton';
import ClassWebsiteInput from './ClassWebsiteInput'
import CourseWebsiteInput from './CourseWebsiteInput';
import Button from './buttons/Button';
import FileUpload from './FileUpload';
import TimeLine from './TimeLine';

import CheckIcon from '@mui/icons-material/Check';

import { handleLoginSuccess, handleLoginFailure, handleLogout } from './login/helpers';
import "../index.css";
import NavBar from "./NavBar"

function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const text = "Welcome to Course Logistics.AI, a course schedule\
   generator dedicated for UC Berkeley Computer Science and Data \
   Science classes.";
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
      Files: [
        {
          filename: 'SampleFile1.txt',
          filepath: '/path/to/samplefile1',
          fileType: 'txt'
        },
        {
          filename: 'SampleFile2.txt',
          filepath: '/path/to/samplefile2',
          fileType: 'txt'
        }
      ]
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
    <div className="App flex flex-col justify-center items-center min-h-screen w-full">
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
      <TimeLine />
      <ClassWebsiteInput />
      <br></br>
      <CourseWebsiteInput />
      <br></br>
      <FileUpload />

      <div className="flex justify-center items-center">
        <Button onClick={handleClick} icon={<CheckIcon />} text={"Confirm"}/>
      </div>
    </div>
  );
}

export default HomePage;
