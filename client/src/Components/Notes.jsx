import notesStore from "../Stores/NotesStore";

export default function Notes() {
    const store = notesStore();
    return (
        <div>
            {store.notes && store.notes.map(e => (
                <div key={e._id}>
                    <h3>{e.title}</h3>
                    <p>{e.body}</p>
                    <button type='button' onClick={() => store.handleDelete(e._id)}>Delete Note</button>
                    <button type='button' onClick={() => store.toggleUpdate(e)}>Edit Note</button>
                </div>
            ))}
        </div>
    );
}
