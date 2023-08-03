import { googleLogout } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

export const handleLoginSuccess = async (credentialResponse, setIsLoggedIn, setUserProfile) => {
    setIsLoggedIn(true);
    const userObject = jwt_decode(credentialResponse.credential);
    setUserProfile(userObject);
};

export const handleLoginFailure = () => {
    console.log("Login is not successful");
};

export const handleLogout = (setIsLoggedIn) => {
    setIsLoggedIn(false);
    googleLogout();
};
