import React from "react";
import DATA from '../Data/data.json';
import Header from "./Header";
import Footer from "./Footer";
import DATA from '../Data/data.json';
import React, { useState } from 'react';
import success from '../img/success.png';


export default function TestPage() {
    return (
        <React.Fragment>
            <Header />
            <Body />
            <Footer />
        </React.Fragment>
    )
}


function Body() {
  const [showImage, setShowImage] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setShowImage(true);
  }

  return (
    <body className="test-page">
        <h1>Personality Quiz</h1>
        <form id="quiz" onSubmit={handleSubmit}>
            {DATA.map((question) => {
                return <CreateQuestion question={question} />
            })}
            <input type="submit" value="Submit" />
        </form>
        {showImage && (
          <div style={{position: 'absolute', top: '300px', right: '300px'}}>
            <img src={success} alt="Success!" style={{width: '150px', height: '150px'}} />
            <p>Form submitted successfully!</p>
          </div>
        )}               
        </body>
  )
}

function CreateQuestion({question}) {
    return (
        <div className="question">
            <h2>{question.Question}</h2>
            <input type="radio" name={question.name} value="A" id="${question.name}A" /><label for="${question.name}A">{question.A}</label><br />
            <input type="radio" name={question.name} value="B" id="${question.name}B" /><label for="${question.name}B">{question.B}</label><br />
            <input type="radio" name={question.name} value="C" id="${question.name}C" /><label for="${question.name}C">{question.C}</label><br />
        </div>
    )
}