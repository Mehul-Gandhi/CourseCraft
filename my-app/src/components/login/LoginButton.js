import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
const GOOGLE_CLIENT_ID = "193453921314-32e272b29jr6ft5ugc12nm8tkedee04g.apps.googleusercontent.com";

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

export default LoginButton;
