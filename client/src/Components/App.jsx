import { useState, useEffect } from 'react'
// import './App.css'
import axios from 'axios';
import notesStore from '../Stores/NotesStore';
import Notes from './Notes';

function App() {
  const store = notesStore();
 

  useEffect(() =>{
    store.fetchNotes();
  },[])


  return (
    <>
    <Notes/>
   { store.updateForm._id && (
          <div>
          <h3>Update Note</h3>
          <form onSubmit={store.updateNote}>
            <input type="text" name='title' value={store.updateForm.title}  onChange={store.handleUpdateFieldChange}/>
            <textarea name="body" value={store.updateForm.body} onChange={store.handleUpdateFieldChange}/>
            <button type='submit' onClick={store.updateNote}>Update</button>
          </form>
        </div>
   )
   }
    {
      !store.updateForm._id && (
      <div>
      <h3>Create note</h3>
      <form onSubmit={store.createNote}>
        <input type="text" name='title' value={store.createForm.title} onChange={store.updateCreateFormField} />
        <textarea name="body" value={store.createForm.body} onChange={store.updateCreateFormField}/>
        <button type='submit'>Submit</button>
      </form>
    </div>)
    }

    </>
  )
}
export default App
