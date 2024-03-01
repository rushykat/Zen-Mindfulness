import React from "react";
import { BrowserRouter as Routes, Route } from "react-router-dom";
import logo from "../img/logo.png";
import card1 from "../img/cards-img1.png";
import card2 from "../img/cards-img2.png";
import card3 from "../img/cards-img3.png";
import card4 from "../img/cards-img4.png";
import LoginPage from "./Login";
import UserPage from "./User";
import TestPage from "./Test";

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

function Card(props) {
  return (
    <div className="card">
      <img src={props.imgSrc} alt="" />
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </div>
  );
}

function Main() {
  return (
    <main>
      <section className="about">
        <h1 id="title">ZEN</h1>
      </section>
      <section>
        <div className="card-container">
          <Card
            imgSrc={card1}
            title="Find Resources"
            description="Access a comprehensive database of mental health resources including therapists, support groups, hotlines, and community centers, empowering users to seek the help and support they need on their journey towards mental wellness."
          />
          <Card
            imgSrc={card2}
            title="Nutrition Tips"
            description="Explore a user-friendly guide to common mental health terminology, providing clarity and understanding on conditions, symptoms, and treatment options, fostering informed decision-making and destigmatizing mental health discussions."
          />
          <Card
            imgSrc={card3}
            title="Personality Test"
            description="Discover evidence-based nutritional advice tailored to support mental well-being, offering practical tips and recipes to promote a balanced diet that can positively impact mood, energy levels, and overall mental health."
          />
          <Card
            imgSrc={card4}
            title="Mental Health Terminology"
            description="Engage in insightful personality assessments designed to increase self-awareness and understanding of personal strengths, preferences, and challenges, facilitating personal growth and informed self-care strategies for improved mental resilience."
          />
        </div>
      </section>
    </main>
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

export default function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
      {/*
      these don't work yet idk
      <Routes>
        <Route path="test" element={<Test />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="user" element={<User />} />
      </Routes>

    */}
    </>
  );
}
