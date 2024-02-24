import React from 'react';
import authStore from '../Stores/AuthStore';

export default function LoginForm() {
    const store = authStore();
    const { loginForm, updateLoginForm, login } = store; 

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(e);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name='email' value={loginForm.email} onChange={updateLoginForm} />
                <input type="password" name='password' value={loginForm.password} onChange={updateLoginForm} />
                <button type='submit'>Login</button>
            </form>
        </div>
    );
}
