const express = require('express');
const router1 = express.Router();
const postgres = require('../postgres.js');


router1.get('/:id', (req, res) => {
    postgres.query(`SELECT * FROM teams WHERE id = ${req.params.id};`, (err, results) => {
        res.json(results.rows)
    });
});

router1.get('/', (req, res) => {
    postgres.query('SELECT * FROM teams', (err, results) => {
        res.json(results.rows)
    });
});




router1.delete('/:id', (req, res) => {
    postgres.query(`DELETE FROM teams WHERE id = ${req.params.id};`, (err, results) => {
        postgres.query('SELECT * FROM teams;', (err, results) => {
            res.json(results.rows)
        });
    });
});

router1.put('/:id', (req, res) => {
    console.log(req.body.params)
    postgres.query(`UPDATE teams SET team_name = '${req.body.team_name}', player_name = '${req.body.player_name}', parent_name='${req.body.parent_name}', phone1='${req.body.phone1}', textok ='${req.body.textok}', phoneok = '${req.body.phoneok}' WHERE id = ${req.params.id}`, (err, results) => {
        postgres.query('SELECT * FROM teams;', (err, results) => {
            res.json(results.rows)
        });
    })
});

router1.post('/', (req, res) => {
    postgres.query(`INSERT INTO teams (team_name, player_name, parent_name, phone1,textok,phoneok) VALUES ('${req.body.team_name}','${req.body.player_name}','${req.body.parent_name}','${req.body.phone1}','${req.body.textok}','${req.body.phoneok}')`, (err, results) => {
        postgres.query('SELECT * FROM teams ORDER BY id ASC;', (err, results) => {
            res.json(results.rows)
        });
    })
});



module.exports = router1;
