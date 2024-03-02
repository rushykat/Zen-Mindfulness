import React from "react";
import logo from "../img/logo.png";
import DATA from '../Data/data.json';
import CreateQuestion from './question';
import { Link } from "react-router-dom";


export default function TestPage() {
    return (
        <div>
            {/* <Header /> */}
            <Body />
            {/* <Footer /> */}
        </div>
    )
}

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div>
            <Link to="/">
              <img className="header__logo" src={logo} alt="" />
            </Link>
          </div>
          <ul className="header__list">
            <li>
              <Link className="header__item" to="/test">
                Personality Test
              </Link>
            </li>
            <li>
              <Link className="header__item" to="/user">
                Personal Stats
              </Link>
            </li>
            <li>
              <Link className="header__item" to="/login">
                Log in
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

function Footer() {
    return (
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Zen Mental Health App Group 10</p>
        </div>
      </footer>
    );
  }

function Body() {
    return (
        <div>
            <h1>Personality Quiz</h1>
            <form id="quiz">
                {DATA.map((question) => {
                    return <CreateQuestion question={question} />
                })}
            </form>
        </div>
    )
}