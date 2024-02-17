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
// db
connectToDb();


//routing
app.get('/', (req, res) =>{
    res.json({hello: "world"})
});

app.get('/notes', async (req, res)=>{
    // find a note
    const notes = await Note.find();
    // respond the note
    res.json({notes: notes});
})

// fetch a single note
app.get('/notes/:id', async (req, res)=>{
    // get the id of the url
    const noteId = req.params.id
    // find the note using that id
    const note = await Note.findById(noteId)
    // respond with the note
    res.json({note: note})
})

app.post('/notes', async (req, res)=>{
    // get the sent in data from the body
    const title = req.body.title
    const body = req.body.body
    // create a note with it
    const note = await Note.create({
        title: title,
        body: body
    })
    // respond with a new note
    res.json({note: note})
})

//start our server
app.listen(process.env.PORT)