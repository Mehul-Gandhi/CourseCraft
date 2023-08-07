import React from 'react';
import UploadButton from './UploadButton';
import Banner from './Banner';
import ConfirmButton from './buttons/ConfirmButton'
import UpdateButton from './buttons/UpdateButton'
import TimeLine from './TimeLine';
import "../index.css";
import NavBar from "./NavBar"
import placeholder from '../assets/placeholder.png'; 

function CompareSchedule() {
  const text = "Update the new schedule with custom modifications or confirm the new schedule.";

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
      
      <div className="flex justify-center space-x-4 m-4 md:m-50" style={{padding: "25px"}}>
        <UpdateButton />
        <ConfirmButton />
      </div>
    </div>
  );
}

export default CompareSchedule;
