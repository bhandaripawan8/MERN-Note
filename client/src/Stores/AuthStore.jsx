import { create } from 'zustand';
import axios from 'axios';

const authStore = create((set) => ({
    loginForm: {
        email: '',
        password: '' 
    },
    updateLoginForm: (e) =>{
        const {name, value} = e.target || e; 
        set((state) =>{
            return {
                loginForm: {
                    ...state.loginForm,
                    [name] : value,
                }
            }
        })
    },

    login: async (e) =>{
        e.preventDefault();
        const {loginForm} = authStore.getState();
       const res = await axios.post('/login', loginForm, {withCredentials: true})
       console.log(res);
    }
}));

export default authStore;
