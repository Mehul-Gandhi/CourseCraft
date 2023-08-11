import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from './Banner';

import Button from './buttons/Button';
import Instructions from "./Instructions";
import Information from "./Information";
import Heading from "./Heading";
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckIcon from '@mui/icons-material/Check';


function ConditionalTooltipInput({ placeholder, value, setValue }) {
    const [showTooltip, setShowTooltip] = useState(false);
    
    return (
        <Tooltip title={placeholder} placement="top" open={!value && showTooltip}>
            <input 
                type="text" 
                placeholder={placeholder} 
                value={value}
                className="form-control me-2"
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setShowTooltip(true)}
                onBlur={() => setShowTooltip(false)}
            />
        </Tooltip>
    );
}


export default function LandingPage() {

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

  
  const text = "Welcome to CourseCraft.AI, a course schedule\
   generator dedicated for course staff at the UC Berkeley Computer Science Department.";

   const getRequest = async (key) => {
    // Assuming the ID is hardcoded as '1234' for this example.
    const id = key;
  
    try {
      const response = await fetch(`http://localhost:3001/getData/${id}`);
  
      if (!response.ok) {
        throw new Error('Server responded with a non-200 status');
      }
  
      const data = await response.json();
  
      console.log('Received data:', data);
      // Optionally, set this data to the state or do something else with it.
      return data;
    } catch (err) {
      console.error('There was an error fetching data:', err);
      setErrorMessage("Incorrect key passed in or database error");
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
      return data;
    } catch (err) {
      console.error('There was an error:', err);
    }
  };
  const getSharedCalendar = async (key) => {
    //get request
    //key?
    if (!key) {
      setErrorMessage("Invalid key. Try again.");
    } else {
      var data = await getRequest(key);
      // state: { key, classWebsite, courseWebsite, uploadData, department, semester, year }
    navigate('/shared', { state: { key, 
      classWebsite: data[0].ClassWebsite,
      courseWebsite: data[0].CourseWebsite,
      uploadData: data[0].uploadData,
      Department: data[0].department,
      Semester: data[0].semester,
      year: data[0].year,
      newCode: data[0].NewSchedule
      } });
    }

    // run the python script here
    

  }

// Within your component:



  return (
<div 
    className="d-flex flex-column justify-content-center align-items-center text-white w-100 h-100" 
    style={{ backgroundColor: '#003262', minHeight: '100vh' }}>
    <Banner text={text} />
      <Instructions />
      <Heading title="Create New Schedule" subtitle="For Course Schedule Creater: Instructor or Head TA. Input the FUTURE semester and year for generating a new course calendar."/>

      <div className="d-flex flex-column align-items-center w-75 space-y-4 mb-5">
        <div className="d-flex w-100 justify-content-between">

        <ConditionalTooltipInput 
                placeholder="Class Code (Ex: CS10)" 
                value={department} 
                setValue={setDepartment}
            />

          <ConditionalTooltipInput 
                placeholder="Semester (Ex: Spring)" 
                value={semester} 
                setValue={setSemester}
            />

          <ConditionalTooltipInput 
                placeholder="Year (Ex: 2023)" 
                value={year} 
                setValue={setYear}
            />
          <Button 
            onClick={handleConfirmClick} 
            icon={<CheckIcon />}
            text={"Confirm"}
            disabled={!department || !semester || !year}
          />
          {/* You might want to style or change the Tooltip to be more Bootstrap-like */}
          <Tooltip title={<div className="h5">
            Input information about your class. <br />
            Example format: <br />
            Class Code: CS10 <br />
            Semester: Spring <br />
            Year: 2023 <br />
            </div>}>
            <InfoOutlinedIcon className="lg-2 cursor-pointer" fontSize="large" />
          </Tooltip>
        </div>

        <br></br>
        <Heading title="Get Existing Schedule" subtitle="For All Course Staff: If a co-worker generated the new calendar, paste the sharing key here to export to code, ics & calendar!"/>
        

        <div className="d-flex w-100 justify-content-between">
         
          <ConditionalTooltipInput 
                placeholder="Shared Key (Example: 1al0NYfHtmimou_PTGbK1Vns0DZfZW2Hh)" 
                value={key} 
                setValue={setKey}
            />
          
  
        <div className="text-white" style={{ fontSize: 'large' }}>OR</div>


          <Button 
            onClick={() => getSharedCalendar(key)}
            icon={<CheckIcon />} 
            text={"Get Calendar From Key"}
            disabled={!key}
          />
          <Tooltip title={<div className="h5">
            Input a shared key to access a course calendar configuration. <br />
            Example format: 1al0NYfHtmimou_PTGbK1Vns0DZfZW2Hh
            </div>}>
            <InfoOutlinedIcon className="lg-2 cursor-pointer" fontSize="large" />
          </Tooltip>
        </div>
        <p className="text-danger mt-2">{errorMessage}</p>
      </div>
    </div>
  );


};
