import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getDatabase, ref, get } from "firebase/database";

export default function ThankYouPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    toast.success("Form submitted successfully!");

    const readAndLogData = () => {
      const database = getDatabase();
      const randomPersonality = Math.floor(Math.random() * 4) + 1; 
      const dataRef = ref(database, 'personality/' + randomPersonality);
    
      get(dataRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setData(snapshot.val().personality_types); 
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    
    readAndLogData();

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
        <br />
        <br />
        <p>Your Myers–Briggs personality type is: </p>
        <br />

        {data && <pre className="personality-type">{data}</pre>}
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