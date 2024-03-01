import React from "react";
import logo from "../img/logo.png";
import DATA from '../Data/data.json';
import CreateQuestion from './question';

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
                <a href="/">
                  <img className="header__logo" src={logo} alt="" />
                </a>
              </div>
              <ul className="header__list">
                <li>
                  <a className="header__item" href="/test">
                    Personality Test
                  </a>
                </li>
                <li>
                  <a className="header__item" href="/user">
                    Personal Stats
                  </a>
                </li>
                <li>
                  <a className="header__item" href="/login">
                    Log in
                  </a>
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