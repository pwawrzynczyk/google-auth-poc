const express = require('express')
const cors = require('cors')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();
const bodyParser = require('body-parser');

const app = express()

const port = 6066;
const CLIENT_ID = '<replaceme>';

app.use(cors())
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
    if (verify(req.body.idToken)) {
        res.send("Backend login ok!")
        return;
    }
    res.send("Backend login failed!")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

async function verify(token) {
    try {
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
