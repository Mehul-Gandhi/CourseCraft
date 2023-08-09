import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');
  const [year, setYear] = useState('');
  const [key, setKey] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleConfirmClick = () => {
    if (!department) {
        setErrorMessage("Please fill out the Class Code.");
        return;
      }
      if (!semester) {
        setErrorMessage("Please fill out the Semester.");
        return;
      }
      if (!year  || isNaN(year) || year < 1900 || year > 2100) {
        setErrorMessage("Please fill out the Year with a valid year.");
        return;
      }
    
    navigate('/upload', { state: { department, semester, year } });
  };

  
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
  const getSharedCalendar = () => {
    //get request
    //key?
    navigate('/calendar', { state: { key } });
  }
  
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


    <div className="flex flex-col items-end" style={{margin: "50px"}}>
      <div className="flex space-x-4 mb-4">
        <input 
          type="text" 
          placeholder="Class Code (Ex: CS10)" 
          value={department}
          className="flex-1 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none px-4 py-2"
          onChange={(e) => setDepartment(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Semester (Ex: Spring)" 
          value={semester}
          className="flex-1 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none px-4 py-2"
          onChange={(e) => setSemester(e.target.value)}
        />

        <input 
          type="text" 
          placeholder="Year (Ex: 2023)" 
          value={year}
          className="flex-1 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none px-4 py-2"
          onChange={(e) => setYear(e.target.value)}
        />

        <Button 
        onClick={handleConfirmClick} 
        icon={<CheckIcon />}
         text={"Confirm"}
         disabled={!department || !semester || !year}
         />
      </div>

      <div className="flex space-x-4">
        <input 
          type="text" 
          placeholder="Key" 
          value={key}
          className="flex-1  flex-grow rounded-full  border-2 border-gray-200 focus:border-blue-500 focus:outline-none px-4 py-2"
          onChange={(e) => setKey(e.target.value)}
        />
        <Button 
        // onClick={handleGetRequestClick}
        onClick={getSharedCalendar}
         icon={<CheckIcon />} 
         text={"Get Request"}
         disabled={!key}
         />
      </div>
      <p className="text-red-600 mt-2">{errorMessage}</p>

    </div>

</div>
  )
      };
