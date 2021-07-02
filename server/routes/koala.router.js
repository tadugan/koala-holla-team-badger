const pool = require('../modules/pool');
const express = require('express');
const { Router } = require('express');
const koalaRouter = express.Router();

// DB CONNECTION


// GET

koalaRouter.get('/', (req, res) => {
    //create variable to hold SQL query
    let queryText = 'SELECT * FROM "koalas";';
    //make SQL query to DB...
    pool.query(queryText)
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('Error trying to get the koala from Postgres', error);
        res.sendStatus(500);
    });
});

// POST


// PUT


// DELETE

module.exports = koalaRouter;