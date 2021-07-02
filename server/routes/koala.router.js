const pool = require('../modules/pool');
const express = require('express');
const { Pool } = require('pg');
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
koalaRouter.delete('/:id', (req, res) => {
    console.log('Request URL: ', req.url);
    console.log('Request route parameters: ', req.params);
    const koalaId = req.params.id;
    console.log(`Koala ID is: ${koalaId}`);

    // creates string to delete koala
    const queryText = `
    DELETE FROM koalas WHERE id = $1
    `;

    pool.query(queryText, [koalaId])
        .then(dbResponse => {
            console.log('How many rows deleted:', dbResponse.rowsCount);
            res.sendStatus(200);
        })
        .catch(error => {
            console.log(`ERROR!! could not delete Koala with id ${koalaId}. Error: ${error}`);
            res.sendStatus(500);
        });
});

module.exports = koalaRouter;