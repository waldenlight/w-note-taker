const path = require('path');
const notes = require('express').Router();
const jsonData = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

notes.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, "../db/db.json"), 'utf-8', (err, data) => {
        if (err) {
            return res.status(400).json({ err });
        }
        res.json(JSON.parse(data));
    })
});

notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            note_id: uuidv4(),
        };

        const writeToFile = function (destination, content) {
            fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
                err ? console.error(err) : console.info(`\nData written to ${destination}`)
            );
        };

        const readAndAppend = (content, file) => {
            fs.readFile(file, 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                } else {
                    const parsedData = JSON.parse(data);
                    parsedData.push(content);
                    writeToFile(file, parsedData);
                }
            });
        };

        readAndAppend(newNote, './db/db.json');

        res.json(newNote);
    } else {
        res.error('Error in adding Note');
    }
});


module.exports = notes;