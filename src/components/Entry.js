import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Chatbot from "./Chatbot";
import { getDatabase, ref, set, push, remove, onValue, off } from "firebase/database";
import { Link } from 'react-router-dom';

export default function EntryPage() {
    const db = getDatabase();
    const { entryId } = useParams();
    const [entry, setEntry] = useState(null);
    const [loading, setLoading] = useState(true); // Add this line
  
    useEffect(() => {
      const entryRef = ref(db, `entries/${entryId}`);
      const listener = onValue(entryRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setEntry({ ...data, id: entryId });
        }
        setLoading(false); // Add this line
      });
  
      return () => {
        off(entryRef, listener);
      };
    }, [entryId]);
  
    // ...
  
    if (loading) { // Add this block
      return <div>Loading...</div>;
    }

  const formatDate = (timestamp) => {
    const options = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(timestamp));
  };


  const handleDelete = (entryId) => {
    const entryRef = ref(db, `entries/${entryId}`);
    remove(entryRef);
  };

  // Render the entry
  // ...

  return (
    <div>
      <h2>{entry.text}</h2>
      <p>{entry.category || "Personal"}</p>
      <p>{formatDate(entry.timestamp)}</p>
      <Link to={`/edit/${entry.id}`} className="btn-submit-form">
        Edit
      </Link>
      <button
        className="btn-submit-form"
        onClick={() => handleDelete(entry.id)}
      >
        Delete
      </button>
    </div>
  );
}