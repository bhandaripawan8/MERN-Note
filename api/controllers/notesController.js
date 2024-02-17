const Note = require('../models/note.js')
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const fetchNotes = async (req, res)=>{
    // find a note
    const notes = await Note.find();
    // respond the note
    res.json({notes: notes});
}

const fetchSingleNote = async (req, res)=>{
    // get the id of the url
    const noteId = req.params.id
    // find the note using that id
    const note = await Note.findById(noteId)
    // respond with the note
    res.json({note: note})
}

const createNote = async (req, res)=>{
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
}

const updateNote = async (req,res)=>{
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
}

const deleteNote = async (req, res) => {
    const noteId = req.params.id;
    try {
        // Convert noteId to ObjectId
        const noteObjectId = new ObjectId(noteId);

        // Delete the record based on _id field
        const result = await Note.deleteOne({ _id: noteObjectId });

        // Check if the record was found and deleted
        if (result.deletedCount === 1) {
            res.json({ success: "Record deleted successfully" });
        } else {
            res.status(404).json({ error: "Record not found" });
        }
    } catch (error) {
        // Handle errors
        console.error("Error deleting record:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// since we can only export one function, but to export all the function, we can export it using object
module.exports = {
    fetchNotes: fetchNotes,
    fetchSingleNote: fetchSingleNote,
    createNote: createNote,
    updateNote: updateNote,
    deleteNote: deleteNote
}