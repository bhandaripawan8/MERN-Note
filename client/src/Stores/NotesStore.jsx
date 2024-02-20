import { create } from 'zustand'
import axios from 'axios';

const notesStore =  create((set) => ({
    notes: null,
    createForm: {
        title: '',
        body: '',
    },
    fetchNotes: async () =>{
        const res = await axios.get('http://localhost:3000/notes');
       set({notes: res.data.notes})},
    
       updateCreateFormField: (e) =>{
        const {name, value} = e.target;

        // setting spread operator in store is  a bit different
        // need to create a function which return an object and inside the object we can create the spread operator
        set((state) =>{
            return{
                createForm:{
                    ...state.createForm,
          [name]: value,

                }
            }
        })
       }
}))

export default notesStore;