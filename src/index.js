import ReactDOM from "react-dom/client";
import "./style.css";
import App from "./components/App";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, remove, onValue } from "firebase/database";
import React, { useState, useEffect } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyD8FGnwTT3_eY8odr_3WTk_-k8KeThxSAs",
  authDomain: "zen-mindfulness.firebaseapp.com",
  databaseURL: "https://zen-mindfulness-default-rtdb.firebaseio.com",
  projectId: "zen-mindfulness",
  storageBucket: "zen-mindfulness.appspot.com",
  messagingSenderId: "235986562941",
  appId: "1:235986562941:web:348215aa1223b8ef35e614",
  measurementId: "G-0RC1TR2DJP",
};

const app = initializeApp(firebaseConfig);

function writeUserData(userId, name, email, imageUrl) {
  const database = getDatabase();
  const reference = ref(database, "users/" + userId);
  set(reference, {
    username: name,
    email: email,
    profile_picture: imageUrl,
  });
}

function writePersonalityTypes(Id, personalityTypes) {
  const database = getDatabase();
  const reference = ref(database, "personality/" + Id);
  set(reference, {
    personality_types: personalityTypes,
  });
}

// writePersonalityTypes('1', 'ESTJ');
// writePersonalityTypes('2', 'ENTJ');
// writePersonalityTypes('3', 'ESFJ');
// writePersonalityTypes('4', 'ENFJ');
// writePersonalityTypes('5', 'ISTJ');
// writePersonalityTypes('6', 'ISFJ');
// writePersonalityTypes('7', 'INTJ');
// writePersonalityTypes('8', 'INFJ');
// writePersonalityTypes('9', 'ESTP');
// writePersonalityTypes('10', 'ESFP');
// writePersonalityTypes('11', 'ENTP');
// writePersonalityTypes('12', 'ENFP');
// writePersonalityTypes('13', 'ISTP');
// writePersonalityTypes('14', 'ISFP');
// writePersonalityTypes('15', 'INTP');
// writePersonalityTypes('16', 'INFP');

function deleteUserData(userId) {
  const database = getDatabase();
  const userRef = ref(database, "users/" + userId);
  remove(userRef);
}

function readAndLogData(path) {
  const database = getDatabase();
  const dataRef = ref(database, path);

  get(dataRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

// writeUserData('3', 'name', 'email@uw.edu', 'imageUrl');
// deleteUserData('3');

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
