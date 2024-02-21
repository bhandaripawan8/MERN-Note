import notesStore from "../Stores/NotesStore"

export default function UpdateForm() {
    const store = notesStore();
    return (
        <div>
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
        </div>

    )
}