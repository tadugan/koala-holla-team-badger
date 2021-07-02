const pool = require('../modules/pool');
const express = require('express');
const { Router } = require('express');
const koalaRouter = express.Router();

// DB CONNECTION


// GET
 

// POST
koalaRouter.post('/', (req, res) => {
    const newKoala = req.body;
    const queryText = `
    INSERT INTO koalas ("name", "gender", "age", "readyForTransfer", "notes")
    VALUES ($1, $2, $3, $4, $5);
    `;
    pool.query(queryText, [newKoala.name, newKoala.gender, newKoala.age, newKoala.readyForTransfer, newKoala.notes])
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