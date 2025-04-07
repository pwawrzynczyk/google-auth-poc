// const BACKEND_LOGIN_URL = 'http://localhost:6066/login';
const BACKEND_LOGIN_URL = 'https://auth-test-server.omnicalculator.com/login';

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

window.addEventListener('message', e => {
  responseMessage(e.data);
});

function App() {
  return <div>login page
    {/* <iframe style={{ border: 'none' }} width='200' height='60' src="http://localhost:6005/login.html"></iframe> */}
    <iframe style={{ border: 'none' }} width='200' height='60' src="https://omnicalculator.com/login.html"></iframe>
  </div>
}

export default App
