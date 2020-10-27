const express = require('express');
const sms = express.Router();
const accountSid = 'AC95582030692c7c46040a8c3ecffc507c';
const authToken = '104394c060417a9b866ffc754959bb81';
const client = require('twilio')(accountSid, authToken);


sms.get('/:msg', (req, res) => {client.messages
  .create({
     body: `${req.params.msg}`,
     from: '+12052735277',
     to: '+15209075815'
   })
  .then(message => console.log(message.sid));
});

module.exports = sms;
