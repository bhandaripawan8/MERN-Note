import { useState, useEffect } from 'react'
// import './App.css'
import axios from 'axios';
import notesStore from '../Stores/NotesStore';

function App() {
  const store = notesStore();
  const [notes, setnotes] = useState(null);
  const [createForm, setcreatForm] = useState({
    title: '',
    body: '',
  });
  const [updateForm, setupdateForm] = useState({
    _id: null,
    title: '',
    body: '',
  })

  useEffect(() =>{
    store.fetchNotes();
  },[])

  // functions
async function fetchAllNotes(){

}

const updateCreateFormField =(e) =>{

}

const createNote = async (e) =>{
}

const handleDelete = async (_id) => {
}

const handleUpdateFieldChange = (e) =>{
}

const toggleUpdate = (e) =>{

}

const updateNote = async (e) =>{

}


  return (
    <>
    {store.notes && store.notes.map(e=>{
      return(
         <div key={e._id}>
          <h3>{e.title}</h3>
        <p>{e.body}</p>
        <button type='submit' onClick={() =>store.handleDelete(e._id)}>Delete Note</button>
        <button type='submit' onClick={()=>store.toggleUpdate(e)}>Edit Note</button>
        </div>
      )
   })}
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
