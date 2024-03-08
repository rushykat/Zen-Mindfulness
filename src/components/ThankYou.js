import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ThankYouPage() {
  useEffect(() => {
    toast.success("Form submitted successfully!");
  }, []);

  return (
    <React.Fragment>
      <Header />
      <ToastContainer />
      <div className="thank-you-page">
        <h1>Thank You!</h1>
        <p>
          Thank you for submitting the form. Your responses have been recorded.
        </p>
        <p>Your personality type is: </p>
        <p className="personality-type"></p>
      </div>
      <div className="test-link-container">
        <Link className="test-link" to="/test">
          Take the Test Again!
        </Link>
      </div>
      <Footer />
    </React.Fragment>
  );
}
