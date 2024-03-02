import React from "react";
import DATA from '../Data/data.json';
import Header from "./Header";
import Footer from "./Footer";


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
    return (
        
          <body className="test-page">
            <h1>Personality Quiz</h1>
            <form id="quiz">
                {DATA.map((question) => {
                    return <CreateQuestion question={question} />
                })}
                <input type="submit" value="Submit" />

            </form>
            
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