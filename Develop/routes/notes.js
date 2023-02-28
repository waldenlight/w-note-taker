const path = require('path');
const notes = require('express').Router();

notes.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'));
});

module.exports = notes;