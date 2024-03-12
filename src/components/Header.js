import React from "react";
import logo from '../img/logo.png';
import { Link } from "react-router-dom";

export default function Header() {
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
                  Journal
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
