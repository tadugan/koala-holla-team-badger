const pool = require('../modules/pool');
const express = require('express');
const { Pool } = require('pg');
const koalaRouter = express.Router();

// DB CONNECTION


// GET
 

// POST


// PUT
koalaRouter.put('/:id', (req, res) => {
    const koalaId = req.params.id;
    let queryText = `UPDATE "koalas" SET "readyForTransfer"='Y' WHERE id=$1;`;

    pool.query(queryText, [koalaId])
    .then(dbResponse => {
        console.log('Updated Koala Status:', dbResponse.rowCount);
        res.sendStatus(202);
    })
    .catch(error => {
        console.log('There was an error updating the record', error);
        res.sendStatus(500);
    });
})

// DELETE

module.exports = koalaRouter;