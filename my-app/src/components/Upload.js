import React, { useState } from 'react';
import Banner from './Banner';

import ClassWebsiteInput from './ClassWebsiteInput'
import CourseWebsiteInput from './CourseWebsiteInput';
import Button from './buttons/Button';
import FileUpload from './FileUpload';
import TimeLine from './TimeLine';
import { useLocation, useNavigate } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';

// import "../index.css";
import "../styles/Upload.css";

export default function Upload() {
  const [uploadData, setUploadData] = useState([]);
  const [classErrorMessage, setClassErrorMessage] = useState("");
  const [courseErrorMessage, setCourseErrorMessage] = useState("");

  const [classWebsite, setClassWebsite] = useState("");
  const [courseWebsite, setCourseWebsite] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const { department, semester, year } = location.state;

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

  const navigateBack = () => {
    window.history.back()
  }

  function generateSchedule() {
    if (!classWebsite) {
      setClassErrorMessage("Class website field is required.");
      return;
    }
    if (!courseWebsite) {
      setCourseErrorMessage("Course website field is required.");
      return;
    }
    navigate('/schedule', { state: { classWebsite, courseWebsite, uploadData, department, semester, year } });
  }
  

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
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: '#003262' }}>
      {/* Top container */}
      <div className="w-100 d-flex flex-row justify-content-between align-items-center px-3 py-2">
        {/* Back button on the left */}
        <Button onClick={navigateBack} icon={<ArrowBackIcon />} text={"Back"} />
  
        {/* Login/Logout button on the right */}
       
      </div>
  
      {/* The rest of your content */}
      <Banner text={text} />
      <TimeLine page={1} />
      <ClassWebsiteInput classWebsite={classWebsite} setClassWebsite={setClassWebsite} />
      {classErrorMessage && <p className="text-red-600 mt-2">{classErrorMessage}</p>}
  
      <br />
      <br />
      <CourseWebsiteInput courseWebsite={courseWebsite} setCourseWebsite={setCourseWebsite} />
      {courseErrorMessage && <p className="text-red-600 mt-2">{courseErrorMessage}</p>}
  
      <br />
      <br />
      <FileUpload uploadData={uploadData} setUploadData={setUploadData} />
  
      <br />
      <div className="d-flex justify-content-center align-items-center" style={{marginBottom: "20px"}}>
        <Button onClick={generateSchedule} icon={<CheckIcon />} text={"Generate Schedule"} />
        {/* <Button onClick={handleClick} icon={<CheckIcon />} text={"Confirm"} />
        <Button onClick={getRequest} icon={<CheckIcon />} text={"Get Request"} /> */}
      </div>
    </div>
  );
}

