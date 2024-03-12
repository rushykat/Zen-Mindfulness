import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import card1 from "../img/cards-img1.png";
import card2 from "../img/cards-img2.png";
import card3 from "../img/cards-img3.png";
import card4 from "../img/cards-img4.png";
import LoginPage from "./Login";
import UserPage from "./User";
import TestPage from "./Test";
import Header from "./Header";
import Footer from "./Footer";
import ThankYouPage from "./ThankYou";

import Notification from "./Notif";

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
    <main className="main-page">
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

export default function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  // console.log(userLoggedIn + " 1");

  const handleUserLoggedIn = () => {
    setUserLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/test" element={<TestPage />} />
        <Route
          path="/login"
          element={<LoginPage handleUserLoggedIn={handleUserLoggedIn} />}
        />
        <Route path="/user" element={<UserPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route
          path="/"
          element={
            <>
              <Header />
              <Notification userLoggedIn={userLoggedIn} />
              <ToastContainer />
              <Main />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}
