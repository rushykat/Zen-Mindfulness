import { getDatabase, ref, push, set, get } from "firebase/database";
import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer'

export default function Login (){
  const [option, setOption] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleOptionChange = (newOption) => {
    setOption(newOption);
  };

  const handleFormSubmit = async (evt) => {
    evt.preventDefault();
  
    const db = getDatabase();
  
    // Check if we're signing up
    if (option === 2) {
      // Check if passwords match
      if (password !== repeatPassword) {
        alert('Passwords do not match!');
        return;
      }
  
      // Write user info to Firebase
      const usersRef = ref(db, 'users');
      const newUserRef = push(usersRef);
      set(newUserRef, {
        email: email,
        password: password, // Note: You should never store passwords in plain text!
      });
    } else if (option === 1) { // Check if we're signing in
      const usersRef = ref(db, 'users');
      const snapshot = await get(usersRef);
      const users = snapshot.val();
  
      for (let userId in users) {
        if (users[userId].email === email && users[userId].password === password) {
          alert('Sign in successful!');
          return;
        }
      }
  
      alert('Invalid email or password!');
    }
  };
  
    return (
      <React.Fragment>
        <Header />
        <div className='container login__container'>
          <div>
            <div className="header-headings">
              <h2>Login/Signup</h2>
            </div>
          </div>
          <ul className='options'>
            <li className={option === 1 ? 'active' : ''} onClick={() => handleOptionChange(1)}>
              Sign in
            </li>
            <li className={option === 2 ? 'active' : ''} onClick={() => handleOptionChange(2)}>
              Sign up
            </li>
            <li className={option === 3 ? 'active' : ''} onClick={() => handleOptionChange(3)}>
              Forgot
            </li>
          </ul>
          <form className={`account-form`} onSubmit={handleFormSubmit}>
             <div className={`account-form-fields ${option === 1 ? 'sign-in' : option === 2 ? 'sign-up' : 'forgot'}`}>
            <input id='email' name='email' type='email' placeholder='E-mail' required onChange={e => setEmail(e.target.value)} />
            <input
              id='password'
              name='password'
              type='text'
              placeholder='Password'
              required={option === 1 || option === 2 ? true : false}
              disabled={option === 3 ? true : false}
              onChange={e => setPassword(e.target.value)}
            />
            <input
              id='repeat-password'
              name='repeat-password'
              type='text'
              placeholder='Repeat password'
              required={option === 2 ? true : false}
              disabled={option === 1 || option === 3 ? true : false}
              onChange={e => setRepeatPassword(e.target.value)}
            />
            </div>
            <button className='btn-submit-form' type='submit'>
              {option === 1 ? 'Sign in' : option === 2 ? 'Sign up' : 'Reset password'}
            </button>
          </form>
        </div>
        <Footer/>
      </React.Fragment>
    );
  }