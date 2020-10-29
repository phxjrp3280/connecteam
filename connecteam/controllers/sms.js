const express = require('express');
const sms = express.Router();
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
sms.post('/', (req, res) => {client.messages
  .create({
     body: req.body.msg,
     from: '+12052735277',
     to: '+15209075815'
   })
  .then(message => console.log(message.sid));
});

module.exports = sms;
