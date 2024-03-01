import React from "react";

export default function createQuestion({question}) {
    return (
        <div className="question">
            <h2>{question.Question}</h2>
            <input type="radio" name={question.name} value="A" id="${question.name}A" /><label for="${question.name}A">{question.A}</label><br />
            <input type="radio" name={question.name} value="B" id="${question.name}B" /><label for="${question.name}B">{question.B}</label><br />
            <input type="radio" name={question.name} value="C" id="${question.name}C" /><label for="${question.name}C">{question.C}</label><br />
        </div>
    )
}