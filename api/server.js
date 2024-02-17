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

app.put('/notes/:id',async (req,res)=>{
    // get the id of the url
    const noteId = req.params.id
    // get the data off the body
    const title = req.body.title
    const body = req.body.body
    // find and update the record
    await Note.findByIdAndUpdate(noteId, {
        title: title,
        body: body
    })

    // find updated note
    const note = await Note.findById(noteId);

    // respond with it
    res.json({note: note})
} )


app.delete('/notes/:id', async (req, res) => {
    try {
        // get id from the URL parameters
        const noteId = req.params.id;
        
        // delete the record
        const result = await Note.deleteOne({ id: noteId });

        // check if the record was found and deleted
        if (result.deletedCount === 1) {
            res.json({ success: "Record deleted successfully" });
        } else {
            res.status(404).json({ error: "Record not found" });
        }
    } catch (error) {
        // handle errors
        console.error("Error deleting record:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//start our server
app.listen(process.env.PORT)