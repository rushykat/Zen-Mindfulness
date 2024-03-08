import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import App from "./components/App";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set} from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyD8FGnwTT3_eY8odr_3WTk_-k8KeThxSAs",
  authDomain: "zen-mindfulness.firebaseapp.com",
  databaseURL: "https://zen-mindfulness-default-rtdb.firebaseio.com",
  projectId: "zen-mindfulness",
  storageBucket: "zen-mindfulness.appspot.com",
  messagingSenderId: "235986562941",
  appId: "1:235986562941:web:348215aa1223b8ef35e614",
  measurementId: "G-0RC1TR2DJP"
};

const app = initializeApp(firebaseConfig);

function writeUserData(userId, name, email, imageUrl) {
  const database = getDatabase();
  const reference = ref(database, 'users/' + userId);

  set(reference, {
      username: name,
      email: email,
      profile_picture : imageUrl
    });
}

writeUserData('1', 'name', 'email', 'imageUrl');

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
