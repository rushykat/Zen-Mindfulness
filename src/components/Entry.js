import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, off } from "firebase/database";

export default function EntryPage() {
    const db = getDatabase();
    const { entryId } = useParams();
    const [entry, setEntry] = useState(null);
    const [loading, setLoading] = useState(true); 
  
    useEffect(() => {
      const entryRef = ref(db, `entries/${entryId}`);
      const listener = onValue(entryRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setEntry({ ...data, id: entryId });
        }
        setLoading(false); 
      });
  
      return () => {
        off(entryRef, listener);
      };
    }, [entryId]);

  
    if (loading) { 
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

  return (
    <div className='entry_card'>
    <table className='entry__table'>
      <thead>
        <tr>
          <th>Reflection</th>
          <th>Category</th>
          <th>Time</th>

        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{entry.text}</td>
          <td>{entry.category || "Personal"}</td>
          <td>{formatDate(entry.timestamp)}</td>

        </tr>
      </tbody>
    </table>
    </div>
  );
}