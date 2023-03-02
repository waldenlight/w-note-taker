const express = require('express');
const path = require('path');
const api = require('./routes/index.js');
// const fs = require('fs');
// const jsonData = require(path.join(__dirname, '/db/db.json'));

const PORT = process.env.port || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api)
app.use(express.static("public"));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// app.get('/api/notes', (req, res) => {
//     res.header("Content-Type", 'application/json');
//     res.send(JSON.stringify(jsonData));
// });

// app.post('/api/notes', (req, res) => {
//     console.log(req.body);

//     const { title, text } = req.body;

//     if (req.body) {
//         const newNote = {
//             title,
//             text,
//             note_id: uuidv4(),
//         };

//         const writeToFile = function (destination, content) {
//             fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
//                 err ? console.error(err) : console.info(`\nData written to ${destination}`)
//             );
//         };

//         const readAndAppend = (content, file) => {
//             fs.readFile(file, 'utf8', (err, data) => {
//                 if (err) {
//                     console.error(err);
//                 } else {
//                     const parsedData = JSON.parse(data);
//                     parsedData.push(content);
//                     writeToFile(file, parsedData);
//                 }
//             });
//         };

//         readAndAppend(newNote, './db/db.json');

//         res.json(newNote);
//     } else {
//         res.error('Error in adding Note');
//     }
// });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);