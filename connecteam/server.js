const express = require('express');
const app = express();
const postgres = require('./postgres.js');

app.use(express.json());
app.use(express.static('public'))

const teamController = require('./controllers/teams.js');
app.use('/teams', teamController);

const billingController = require('./controllers/billing.js');
app.use('/billing', billingController);

postgres.connect();

app.listen(process.env.PORT || 3000, () => {
    console.log('listening');
})
