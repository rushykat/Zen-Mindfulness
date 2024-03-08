import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DATA from "../Data/data.json";
import Header from "./Header";
import Footer from "./Footer";

export default function TestPage() {
  const [answers, setAnswers] = useState(Array(DATA.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (answers.every((answer) => answer !== null)) {
      setSubmitted(true);
    } else {
      toast.error("Please answer all questions!");
    }
  };

  const handleAnswerChange = (index, selectedOption) => {
    const newAnswers = [...answers];
    newAnswers[index] = selectedOption;
    setAnswers(newAnswers);
  };

  return (
    <React.Fragment>
      <Header />
      <ToastContainer />
      {submitted ? (
        <Navigate to="/thank-you" />
      ) : (
        <Body
          handleSubmit={handleSubmit}
          handleAnswerChange={handleAnswerChange}
          answers={answers}
        />
      )}
      <Footer />
    </React.Fragment>
  );
}

function Body({ handleSubmit, handleAnswerChange, answers }) {
  return (
    <body className="test-page">
      <h1>Personality Quiz</h1>
      <form id="quiz" onSubmit={handleSubmit}>
        {DATA.map((question, index) => (
          <CreateQuestion
            key={index}
            question={question}
            index={index}
            handleAnswerChange={handleAnswerChange}
            selectedOption={answers[index]}
          />
        ))}
        <input type="submit" value="Submit" />
      </form>
    </body>
  );
}

function CreateQuestion({
  question,
  index,
  handleAnswerChange,
  selectedOption,
}) {
  return (
    <div className="question">
      <h2>{question.Question}</h2>
      <div>
        <input
          type="radio"
          id={`${question.name}${index}A`}
          name={`${question.name}${index}`}
          value="A"
          checked={selectedOption === "A"}
          onChange={() => handleAnswerChange(index, "A")}
        />
        <label for={`${question.name}${index}A`}>{question.A}</label>
      </div>
      <div>
        <input
          type="radio"
          id={`${question.name}${index}B`}
          name={`${question.name}${index}`}
          value="B"
          checked={selectedOption === "B"}
          onChange={() => handleAnswerChange(index, "B")}
        />
        <label for={`${question.name}${index}B`}>{question.B}</label>
      </div>
      <div>
        <input
          type="radio"
          id={`${question.name}${index}C`}
          name={`${question.name}${index}`}
          value="C"
          checked={selectedOption === "C"}
          onChange={() => handleAnswerChange(index, "C")}
        />
        <label for={`${question.name}${index}C`}>{question.C}</label>
      </div>
    </div>
  );
}
