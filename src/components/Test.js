import React from "react";
import logo from "../img/logo.png";
import DATA from '../Data/data.json';
import { Link } from "react-router-dom";


export default function TestPage() {
    return (
        <div>
            <Header />
            <Body />
            <Footer />
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

function Footer (){
  return (
      <footer className="footer footer__user">
          <div className="container">
              <p>&copy; 2024 Zen Mental Health App</p>
          </div>
      </footer>
  );
}



function Body() {
    return (
        
          <body className="test-page">
            <h1>Personality Quiz</h1>
            <form id="quiz">
                {DATA.map((question) => {
                    return <CreateQuestion question={question} />
                })}
            </form>
            
          </body>
    )
}

function CreateQuestion({question}) {
    return (
        <div className="question">
            <h2>{question.Question}</h2>
            <input type="radio" name={question.name} value="A" id="${question.name}A" /><label for="${question.name}A"> {question.A}</label><br />
            <input type="radio" name={question.name} value="B" id="${question.name}B" /><label for="${question.name}B"> {question.B}</label><br />
            <input type="radio" name={question.name} value="C" id="${question.name}C" /><label for="${question.name}C"> {question.C}</label><br />
        </div>
    )
}