import './App.css';
import UploadButton from './components/UploadButton';
import Banner from './components/Banner';
import LoginButton from './components/login/LoginButton';
import LogoutButton from './components/login/LogoutButton';
import { handleLoginSuccess, handleLoginFailure, handleLogout } from './components/login/helpers';
import { useState } from "react"; 
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

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

      <Banner />
      <UploadButton />
    </div>
  );
}

export default App;
