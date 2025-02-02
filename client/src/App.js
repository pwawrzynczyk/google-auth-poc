import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const BACKEND_LOGIN_URL = 'http://localhost:6066/login';
const CLIENT_ID = '<replaceme>';

function App() {
  const responseMessage = async (response) => {
    console.log('we got data, now login with backend');
    try {
      const backendResponse = await fetch(BACKEND_LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken: response.credential })
      })
      console.log(await backendResponse.text())
    } catch (e) {
      console.log('login to backend failed', e)
    }
  };
  return <GoogleOAuthProvider clientId={CLIENT_ID}>
    <GoogleLogin onSuccess={responseMessage} onError={alert} />
  </GoogleOAuthProvider>
}

export default App
