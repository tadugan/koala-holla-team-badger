const pool = require('../modules/pool');
const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION


// GET
 

// POST


// PUT


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