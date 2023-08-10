import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from './Banner';
import LoginButton from './login/LoginButton';
import LogoutButton from './login/LogoutButton';

import Button from './buttons/Button';
import Instructions from "./Instructions"
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CheckIcon from '@mui/icons-material/Check';



import { handleLoginSuccess, handleLoginFailure, handleLogout } from './login/helpers';
import "../App.css"

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
   generator dedicated for course staff at the UC Berkeley Computer Science Department.";

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
    if (!key) {
      setErrorMessage("Invalid key. Try again.");
    } else {
    navigate('/shared', { state: { key } });
    }

    // run the python script here
    

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
  
      <Banner text={text} />
      <Instructions />
  
      <div className="flex flex-col items-center w-3/4 space-y-4" style={{ margin: "50px" }}>
        <div className="flex w-full space-x-4 text-[#FFB81C]">
          <input 
            type="text" 
            placeholder="Class Code (Ex: CS10)" 
            value={department}
            className="flex-grow rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none px-4 py-2"
            onChange={(e) => setDepartment(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Semester (Ex: Spring)" 
            value={semester}
            className="flex-grow rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none px-4 py-2"
            onChange={(e) => setSemester(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Year (Ex: 2023)" 
            value={year}
            className="flex-grow rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none px-4 py-2"
            onChange={(e) => setYear(e.target.value)}
          />
          <Button 
            onClick={handleConfirmClick} 
            icon={<CheckIcon />}
            text={"Confirm"}
            disabled={!department || !semester || !year}
          />
          <Tooltip title={<div className="text-xl">
            Input information about your class. <br />
            Example format: <br />
            Class Code: CS10 <br />
            Semester: Spring <br />
            Year: 2023 <br />
            </div>}>
            <InfoOutlinedIcon fontSize="large" style={{ marginLeft: '5px', cursor: 'pointer' }} />
          </Tooltip>
        </div>
  
        <div className="flex w-full space-x-4 text-[#FFB81C]">
          <input 
            type="text" 
            placeholder="Key" 
            value={key}
            className="w-full flex-grow rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none px-4 py-2"
            onChange={(e) => setKey(e.target.value)}
          />
          <Button 
            onClick={getSharedCalendar}
            icon={<CheckIcon />} 
            text={"Get Request"}
            disabled={!key}
          />
          <Tooltip title={<div className="text-xl">
            Input a shared key to access a course calendar configuration. <br />
            Example format: 1al0NYfHtmimou_PTGbK1Vns0DZfZW2Hh
            </div>}>
            <InfoOutlinedIcon fontSize="large" style={{ marginLeft: '5px', cursor: 'pointer' }} />
          </Tooltip>
        </div>
        <p className="text-red-600 mt-2">{errorMessage}</p>
      </div>
    </div>
  );

};
