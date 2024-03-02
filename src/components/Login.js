import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer'

export default function Login (){
    const [option, setOption] = useState(1);
  
    const handleOptionChange = (newOption) => {
      setOption(newOption);
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
          <form className={`account-form`} onSubmit={(evt) => evt.preventDefault()}>
            <div className={`account-form-fields ${option === 1 ? 'sign-in' : option === 2 ? 'sign-up' : 'forgot'}`}>
              <input id='email' name='email' type='email' placeholder='E-mail' required />
              <input
                id='password'
                name='password'
                type='password'
                placeholder='Password'
                required={option === 1 || option === 2 ? true : false}
                disabled={option === 3 ? true : false}
              />
              <input
                id='repeat-password'
                name='repeat-password'
                type='password'
                placeholder='Repeat password'
                required={option === 2 ? true : false}
                disabled={option === 1 || option === 3 ? true : false}
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