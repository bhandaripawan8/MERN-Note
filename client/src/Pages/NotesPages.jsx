import React, { useEffect } from 'react'
import Notes from '../Components/Notes'
import UpdateForm from '../Components/UpdateForm'
import CreateForm from '../Components/CreateForm'
import notesStore from '../Stores/NotesStore';

export default function NotesPages() {
    const store = notesStore();
    useEffect(() =>{
        store.fetchNotes();
      },[])
    
  return (
    <div>
    <Notes/>
    <UpdateForm/>
    <CreateForm/>
    </div>
  )
}
