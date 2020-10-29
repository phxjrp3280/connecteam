const express = require('express');
const billing = express.Router();
const postgres = require('../postgres.js');

billing.get('/', (req, res) => {
  console.log('in get route')
    postgres.query('SELECT a.id, a.jobname, a.target_phone1, a.target_datetime, b.player_name FROM teams_transaction a, teams b WHERE a.target_phone1 = b.phone1', (err, results) => {
        res.json(results.rows)
    });
});

billing.delete('/:id', (req, res) => {
    postgres.query(`DELETE FROM teams_transaction WHERE id = ${req.params.id};`, (err, results) => {
        postgres.query('SELECT * FROM teams_transaction;', (err, results) => {
            res.json(results.rows)
        });
    });
});

billing.put('/:id', (req, res) => {
    postgres.query(`UPDATE teams_transaction SET jobname = '${req.body.jobname}', target_phone1 = '${req.body.target_phone1}', target_datetime='${req.body.target_datetime}' WHERE id = ${req.params.id}`, (err, results) => {
        postgres.query('SELECT * FROM teams_transaction;', (err, results) => {
            res.json(results.rows)
        });
    })
});

billing.post('/', (req, res) => {
    postgres.query(`INSERT INTO teams_transaction (jobname, target_phone1, target_datetime) VALUES ('${req.body.jobname}','${req.body.target_phone1}','${req.body.target_datetime}');`, (err, results) => {
        postgres.query('SELECT * FROM teams_transaction ORDER BY id ASC;', (err, results) => {
            res.json(results.rows)
        });
    })
});

module.exports = billing;
// '${req.body.target_datetime}'
