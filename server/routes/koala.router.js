const pool = require('../modules/pool');
const express = require('express');
const { Router } = require('express');
const koalaRouter = express.Router();

// DB CONNECTION


// GET
 

// POST
router.post('/', (req, res) => {
    const koalaToSend = req.body;
    const queryText = `
    INSERT INTO koalas ("name", "gender", "age", "readyForTransfer", "notes")
    VALUES ($1, $2, $3, $4, $5);
    `;
    pool.query(queryText, [koalaToSend.name, koalaToSend.gender, koalaToSend.age, koalaToSend.readyForTransfer, koalaToSend.notes])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(`Error making query ${queryText}`, err);
            res.sendStatus(500);
        });
});

// PUT


// DELETE

module.exports = koalaRouter;