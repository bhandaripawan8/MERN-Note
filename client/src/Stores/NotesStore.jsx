import { create } from 'zustand';
import axios from 'axios';

const notesStore = create((set) => ({
  notes: null,
  createForm: {
    title: '',
    body: '',
  },
  updateForm: {
    title: '',
    body: '',
    _id: null,
  },
  fetchNotes: async () => {
    try {
      const res = await axios.get('http://localhost:3000/notes');
      set({ notes: res.data.notes });
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  },
  updateCreateFormField: (e) => {
    const { name, value } = e.target;
    set((state) => ({
      createForm: {
        ...state.createForm,
        [name]: value,
      },
    }));
  },
  createNote: async () => {
    try {
      const { createForm } = notesStore.getState();
      const res = await axios.post('http://localhost:3000/notes', createForm);
      set((state) => ({
        notes: [...state.notes, res.data.note],
        createForm: {
          title: '',
          body: '',
        },
      }));
    } catch (err) {
      console.error('error creating note:', err);
    }
  },
  handleDelete: async (_id) => {
    const userConfirmed = window.confirm('Are you sure you want to delete the note?');
    if (userConfirmed) {
      try {
        const response = await axios.delete(`http://localhost:3000/notes/${_id}`);
        console.log('Record Deleted', response.data);
        // Fetch all notes after deleting
        notesStore.getState().fetchNotes();
      } catch (error) {
        console.error('Error deleting:', error);
        // Handle error
      }
    }
  },
  handleUpdateFieldChange: (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    set((state) => ({
      updateForm: {
        ...state.updateForm,
        [name]: value,
      },
    }));
  },
  toggleUpdate: (e) => {
    const { _id, title, body } = e;
    set((state) => ({
      updateForm: {
        ...state.updateForm,
        _id: _id,
        title: title,
        body: body,
      },
    }));
},

  updateNote: async () => {
    const { title, body, _id } = notesStore.getState().updateForm;
    try {
      await axios.put(`http://localhost:3000/notes/${_id}`, { title, body });
    } catch (error) {
      console.error('Error updating note:', error);
    }
  },
}));

export default notesStore;
