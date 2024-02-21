import notesStore from "../Stores/NotesStore"

export default function CreateForm(){
    const store = notesStore();
    return (
        <div>
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
        </div>
    )
}