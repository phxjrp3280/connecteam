// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = 'AC95582030692c7c46040a8c3ecffc507c';
const authToken = '104394c060417a9b866ffc754959bb81';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+12052735277',
     to: '+15209075815'
   })
  .then(message => console.log(message.sid));
