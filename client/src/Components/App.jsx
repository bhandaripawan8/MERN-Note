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
  e.preventDefault();
  try{
  await axios.post('http://localhost:3000/notes', createForm)
  // fetching all note after creating a new one (invoke the function)
  store.fetchNotes();
  setcreatForm({title: '', body: ''})
  } catch(err){
    console.error('error creating note:')
  }
}

const handleDelete = async (_id) => {
  const userConfirmed = window.confirm("Are you sure you want to delete the note?");
  if(userConfirmed) {
    try {
      const response = await axios.delete(`http://localhost:3000/notes/${_id}`);
      console.log('Record Deleted', response.data);
      // Fetch all notes after deleting
      store.fetchNotes();
    } catch (error) {
      console.error('Error deleting:', error);
      // Handle error
    }
  }
}

const handleUpdateFieldChange = (e) =>{
  e.preventDefault();
  const {value, name} = e.target;
  setupdateForm({
    ...updateForm,
    [name]: value,
  })
}

const toggleUpdate = (e) =>{
  // set states on update form
  setupdateForm({title: e.title, body: e.body, _id: e._id})
}

const updateNote = async (e) =>{
  const {title, body} = updateForm;
  const res = await axios.put(`http://localhost:3000/notes/${updateForm._id}`, {title, body})
}


  return (
    <>
    {store.notes && store.notes.map(e=>{
      return(
         <div key={e._id}>
          <h3>{e.title}</h3>
        <p>{e.body}</p>
        <button type='submit' onClick={() =>handleDelete(e._id)}>Delete Note</button>
        <button type='submit' onClick={()=>toggleUpdate(e)}>Edit Note</button>
        </div>
      )
   })}
   { updateForm._id && (
          <div>
          <h3>Update Note</h3>
          <form onSubmit={updateNote}>
            <input type="text" name='title' value={updateForm.title}  onChange={handleUpdateFieldChange}/>
            <textarea name="body" value={updateForm.body} onChange={handleUpdateFieldChange}/>
            <button type='submit' onClick={updateNote}>Update</button>
          </form>
        </div>
   )
   }
    {
      !updateForm._id && (
      <div>
      <h3>Create note</h3>
      <form onSubmit={createNote}>
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
