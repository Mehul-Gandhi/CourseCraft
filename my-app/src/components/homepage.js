// import '../styles/HomePage.css';
import UploadButton from './UploadButton';
import Banner from './Banner';
import LoginButton from './login/LoginButton';
import LogoutButton from './login/LogoutButton';
import ClassWebsiteInput from './ClassWebsiteInput'
import CourseWebsiteInput from './CourseWebsiteInput'

import { handleLoginSuccess, handleLoginFailure, handleLogout } from './login/helpers';
import { useState } from "react"; 
import "../index.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Button from 'react-bootstrap/Button';



function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  return (
    <div className="App">
        <div className="text-3xl font-bold underline green">
            Hello world
        </div>
      {isLoggedIn ? (
        <LogoutButton onLogout={() => handleLogout(setIsLoggedIn)} />
      ) : (
        <LoginButton
          onSuccess={(credentialResponse) => handleLoginSuccess(credentialResponse, setIsLoggedIn, setUserProfile)}
          onFailure={handleLoginFailure}
          cookiePolicy="single_host_origin"
        />
      )}

      <Banner />
      {/* <Timeline /> */}
      <ClassWebsiteInput />
      <br></br>
      <CourseWebsiteInput />
      
      <UploadButton />


    </div>
  );
}

export default HomePage;
