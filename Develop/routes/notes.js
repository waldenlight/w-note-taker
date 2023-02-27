const path = require('path');
const notes = require('express').Router();

notes.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

module.exports = notes;