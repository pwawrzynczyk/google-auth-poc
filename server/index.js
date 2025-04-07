const express = require('express')
const cors = require('cors')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();
const bodyParser = require('body-parser');
const fs = require('fs')
const https = require('https')

const app = express()

const port = 6066;
const CLIENT_ID = '915518205232-dteuj7chu736h3pjqth50j8so4mik4rg.apps.googleusercontent.com';

app.use(cors())
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.post('/login', async (req, res) => {
    if (await verify(req.body.idToken)) {
        res.send("Backend login ok!")
        return;
    }
    res.send("Backend login failed!")
})

if (process.env.NODE_ENV !== "production") {
    app.listen(port, () => {
      console.log("DEV server is listening on port " + port);
    });
  } else {
  
    const privateKey = fs.readFileSync("/var/svc/certs/privkey.pem");
    const certificate = fs.readFileSync("/var/svc/certs/cert.pem");
  
    https
      .createServer(
        {
          key: privateKey,
          cert: certificate,
        },
        app
      )
      .listen(port, () => {
        console.log("PROD server is listening on port " + port);
      });
  }

async function verify(token) {
    try {
        // more needs to be done - https://developers.google.com/identity/sign-in/web/backend-auth#verify-the-integrity-of-the-id-token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        // const domain = payload['hd'];
        console.log(payload.name, 'has logged in with userId:', userid)
        return true;
    } catch (e) {
        console.log('cannot verify token: ', e);
        return false;
    }
}




