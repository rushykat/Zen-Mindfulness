import React from "react";
import logo from '../img/logo.png';
import { Link } from "react-router-dom";


export default function UserPage() {
    return (
        <div>
            <Header />
            <main>
                <section className="stats" id="stats">
                    <div className="container stats__container">
                        <h2 className="stats__title">Your Stats</h2>
                        <div className="stats__tabs">
                            <Tab id="tab1" label="Current Condition" content="CONTENT for Tab #1" />
                            <Tab id="tab2" label="Sleep" content="CONTENT for Tab #2" />
                            <Tab id="tab3" label="Mindfulness" content="CONTENT for Tab #3" />
                            <Tab id="tab4" label="Activity" content="CONTENT for Tab #4" />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
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


const Tab = ({ id, label, content }) => {
    return (
        <>
            <input type="radio" className="stats__tabs-radio" name="tabs-example" id={id} defaultChecked={id === 'tab1'}/>
            <label htmlFor={id} className="stats__tabs-label">{label}</label>
            <div className="stats__tabs-content">
                {content}
            </div>
        </>
    );
}