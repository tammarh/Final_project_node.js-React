/*import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, logout } from './authSlice';
import { useLoginMutation } from './authApi';

import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

export default function LoginForm() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ username, password }).unwrap();
      localStorage.setItem('token', result.token);
      dispatch(setUser(result));
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  if (user) {
    return (
      <div>
        <h2>שלום, {user.name}</h2>
        <Button label="התנתק" onClick={() => dispatch(logout())} />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>התחברות</h3>
      <label htmlFor="username">שם משתמש</label>
      <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="mb-3" />

      <label htmlFor="password">סיסמה</label>
      <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-3" toggleMask />

      <Button type="submit" label={isLoading ? 'טוען...' : 'התחבר'} disabled={isLoading} />
      {error && <Message severity="error" text="שגיאה בהתחברות" />}
    </form>
  );
}
*/