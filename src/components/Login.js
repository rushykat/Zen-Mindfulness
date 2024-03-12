import { getDatabase, ref, push, set, get } from "firebase/database";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login({ handleUserLoggedIn }) {
  const [option, setOption] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const handleOptionChange = (newOption) => {
    setOption(newOption);
  };

  const handleFormSubmit = async (evt) => {
    evt.preventDefault();

    const db = getDatabase();

    // Check if we're signing up
    if (option === 2) {
      if (password !== repeatPassword) {
        toast.error("Passwords do not match!");
        return;
      }
      const usersRef = ref(db, "users");
      const newUserRef = push(usersRef);
      set(newUserRef, {
        email: email,
        password: password,
      });
      setUserLoggedIn(true);
    } else if (option === 1) {
      // Check if we're signing in
      const usersRef = ref(db, "users");
      const snapshot = await get(usersRef);
      const users = snapshot.val();

      for (let userId in users) {
        if (
          users[userId].email === email &&
          users[userId].password === password
        ) {
          setUserLoggedIn(true);
          return <Navigate to="/" />;
        }
      }

      toast.error("Invalid email or password!");
    }
  };

  if (userLoggedIn) {
    handleUserLoggedIn();
    return <Navigate to="/" />;
  }

  return (
    <React.Fragment>
      <Header />
      <ToastContainer />
      <div className="container login__container">
        <div>
          <div className="header-headings">
            <h2>Login/Signup</h2>
          </div>
        </div>
        <ul className="options">
          <li
            className={option === 1 ? "active" : ""}
            onClick={() => handleOptionChange(1)}
          >
            Sign in
          </li>
          <li
            className={option === 2 ? "active" : ""}
            onClick={() => handleOptionChange(2)}
          >
            Sign up
          </li>
          <li
            className={option === 3 ? "active" : ""}
            onClick={() => handleOptionChange(3)}
          >
            Forgot
          </li>
        </ul>
        <form className={`account-form`} onSubmit={handleFormSubmit}>
          <div
            className={`account-form-fields ${
              option === 1 ? "sign-in" : option === 2 ? "sign-up" : "forgot"
            }`}
          >
            <input
              id="email"
              name="email"
              type="email"
              placeholder="E-mail"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              required={option === 1 || option === 2}
              disabled={option === 3}
              onChange={(e) => setPassword(e.target.value)}
            />
            {option === 2 && (
              <input
                id="repeat-password"
                name="repeat-password"
                type="password"
                placeholder="Repeat password"
                required={option === 2}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            )}
          </div>
          <button className="btn-submit-form" type="submit">
            {option === 1
              ? "Sign in"
              : option === 2
              ? "Sign up"
              : "Reset password"}
          </button>
        </form>
      </div>
      <Footer />
    </React.Fragment>
  );
}
