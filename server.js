require('dotenv').config();
var express = require('express');
var app = express();

const requestIp = require('request-ip');

var cors = require('cors');

app.use(cors({optionsSuccessStatus: 200})); 
app.use(requestIp.mw())
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/whoami", function (req,res) {
  const ip = req.ip;
  const language = req.headers['accept-language'];
  const software = req.headers['user-agent'];
  res.json({
    ipaddress: ip, 
    language: language, 
    software: software
  });
})

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
