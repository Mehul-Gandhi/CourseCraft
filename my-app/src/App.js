import './App.css';
import UploadButton from './components/UploadButton';
import Banner from './components/Banner';
import { GoogleOAuthProvider, GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useState } from "react"; 

const GOOGLE_CLIENT_ID = "";

function LoginButton({ onSuccess, onFailure }) {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onFailure}
      />
    </GoogleOAuthProvider>
  );
}

function LogoutButton({ onLogout }) {
  return <button onClick={onLogout}>Logout</button>;
}



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  

  const handleLoginSuccess = async (credentialResponse) => {
    setIsLoggedIn(true);
    console.log(credentialResponse);
    setUserProfile(credentialResponse.profileObj);
    console.log(userProfile);
  };

  const handleLoginFailure = () => {
    console.log("Login is not successful");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    googleLogout();
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <LogoutButton onLogout={handleLogout} />
      ) : (
        <LoginButton
          onSuccess={handleLoginSuccess}
          onFailure={handleLoginFailure}
        />
      )}

      <Banner />
      <UploadButton />
    </div>
  );
}

export default App;
