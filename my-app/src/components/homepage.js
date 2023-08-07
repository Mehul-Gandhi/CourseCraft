// import '../styles/HomePage.css';
import UploadButton from './UploadButton';
import Banner from './Banner';
import LoginButton from './login/LoginButton';
import LogoutButton from './login/LogoutButton';
import ClassWebsiteInput from './ClassWebsiteInput'
import CourseWebsiteInput from './CourseWebsiteInput';
import ConfirmButton from './buttons/ConfirmButton';
import FileUpload from './FileUpload';
import TimeLine from './TimeLine';

import { handleLoginSuccess, handleLoginFailure, handleLogout } from './login/helpers';
import { useState } from "react";
import "../index.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Button from 'react-bootstrap/Button';
import NavBar from "./NavBar"

function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const text = "Welcome to Course Logistics.AI, a course schedule\
   generator dedicated for UC Berkeley Computer Science and Data \
   Science classes.";
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
      <TimeLine />
      <ClassWebsiteInput />
      <br></br>
      <CourseWebsiteInput />
      <br></br>
      {/* <FileUpload /> */}
      <br></br>
      <ConfirmButton />
    </div>
  );
}

export default HomePage;
