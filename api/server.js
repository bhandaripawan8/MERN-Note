// Load env variable
if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}

// import dependencies
const express = require('express');
const app = express();
const connectToDb = require('./config/connectToDb')
const Note = require('./models/note');
app.use(express.json());
const notesController = require('./controllers/notesController.js')
const cors = require('cors');
// db
connectToDb();
app.use(cors());

// app.get('/', (req, res) =>{
//     res.json({hello: "world"})
// });

// Routing
app.get('/notes', notesController.fetchNotes)
app.get('/notes/:id', notesController.fetchSingleNote)
app.post('/notes', notesController.createNote)
app.put('/notes/:id', notesController.updateNote)
app.delete('/notes/:id', notesController.deleteNote);

//start our server
app.listen(process.env.PORT)