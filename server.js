const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const api = require('./routes/api');

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(cors());

const options = {
  key: fs.readFileSync('./ssl/privateKey.key'),
  cert: fs.readFileSync('./ssl/certificate.crt')
};
 
app.use('/api', api);

app.get('/', function (req, res) {
    res.status(200).send('Server is Up & Running');
});

https.createServer(options, app).listen(PORT, () => {
    console.log('Server is Listening on https://localhost:'+ PORT +' or https://127.0.0.1:'+ PORT);
});