import { useState, useEffect } from 'react'
// import './App.css'

import notesStore from '../Stores/NotesStore';
import Notes from './Notes';
import UpdateForm from './UpdateForm';
import CreateForm from './CreateForm';

function App() {
  const store = notesStore();
 
  useEffect(() =>{
    store.fetchNotes();
  },[])

  return (
    <>
    <Notes/>
    <UpdateForm/>
    <CreateForm/>
    </>
  )
}
export default App
