import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Chatbot from "./Chatbot";
import { getDatabase, ref, set, push, remove, onValue, off } from "firebase/database";
import { Link } from 'react-router-dom';


export default function UserPage() {
  const [entry, setEntry] = useState("");
  const [category, setCategory] = useState("Personal");
  const [entries, setEntries] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategory, setFilteredCategory] = useState("All");

  const db = getDatabase();

  useEffect(() => {
    const entriesRef = ref(db, 'entries');
    const listener = onValue(entriesRef, (snapshot) => {
      const data = snapshot.val();
      let list = data ? Object.keys(data).map(key => ({ ...data[key], id: key })) : [];

      // Apply search filter
      list = list.filter(entry => entry.text.toLowerCase().includes(searchTerm.toLowerCase()));

      // Apply category filter
      if (filteredCategory !== 'All') {
        list = list.filter(entry => entry.category === filteredCategory);
      }

      setEntries(list);
    });

    return () => {
      off(entriesRef, listener);
    };
  }, [searchTerm, filteredCategory]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (entry.trim() !== "") {
      setLoading(true);
      if (editIndex !== null) {
        const entryId = entries[editIndex].id;
        const entryRef = ref(db, `entries/${entryId}`);
        setTimeout(() => {
          set(entryRef, {
            text: entry,
            timestamp: new Date().toLocaleString(),
            category: category,
          });
          setEditIndex(null);
          setLoading(false);
        }, 1000);
      } else {
        const newEntry = {
          text: entry,
          timestamp: new Date().toLocaleString(),
          category: category,
        };
        const entriesRef = ref(db, 'entries');
        setTimeout(() => {
          push(entriesRef, newEntry);
          setLoading(false);
        }, 1000);
      }
      setEntry("");
      setCategory("Personal");
    }
  };

  const handleDelete = (entryId) => {
    const entryRef = ref(db, `entries/${entryId}`);
    remove(entryRef);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEntry(entries[index].text);
    setCategory(entries[index].category || "Personal");
  };

  return (
    <>
      <Header />
      <main>
        <div className="journal">
          <div className="container">
            <h2 className="journal__title">Journal</h2>
            <form className="journal__form" onSubmit={handleSubmit}>
              <label className="journal__label" htmlFor="entryText">
                <h3 className="journal__subtitle">Reflection:</h3>
              </label>
              <textarea
                id="entryText"
                placeholder="Write your reflection here..."
                className="journal__text"
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
              />
              <br />
              <label className="journal__label" htmlFor="category">
                <h3 className="journal__subtitle">Category:</h3>
              </label>
              <select
                id="category"
                className="journal__category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Health">Health</option>
                <option value="Family">Family</option>
              </select>
              <br />
              <button className="journal__button btn-submit-form" type="submit">
                {editIndex !== null ? "Update Entry" : "Add Entry"}
              </button>
            </form>
            <div>
              <h3>Entries</h3>
              <div className="journal__wrapper">
                <div>
              <label className="journal__label" htmlFor="searchTerm">
                <h5 className="journal__subtitle">Search:</h5>
              </label>
              <input
                type="text"
                id="searchTerm"
                className="journal__input"
                placeholder="Search entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              </div>
              <div>
              <label className="journal__label" htmlFor="filterCategory">
                <h5 >Filter by Category:</h5>
              </label>
              <select
                id="filterCategory"
                className="journal__category"
                value={filteredCategory}
                onChange={(e) => setFilteredCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Health">Health</option>
                <option value="Family">Family</option>
              </select>
              </div>
              </div>
              <table className="journal__table">
                <thead>
                  <tr>
                    <th>Reflection</th>
                    <th>Category</th>
                    <th>Time</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
  {entries.map((item, index) => (
    <tr key={index}>
      <td>{item.text}</td>
      <td>{item.category || "Personal"}</td>
      <td>{formatDate(item.timestamp)}</td>
      <td>
        <button
          className="btn-submit-form"
          onClick={() => handleEdit(index)}
        >
          Edit
        </button>
      </td>
      <td>
        <button
          className="btn-submit-form"
          onClick={() => handleDelete(item.id)}
        >
          Delete
        </button>
      </td>
      <td>
        <Link to={`/entry/${item.id}`} className="btn-submit-form"> {/* Add this line */}
          View
        </Link> {/* Add this line */}
      </td>
    </tr>
  ))}
</tbody>
              </table>
            </div>
          </div>
          {loading && <div className="loading-popup"><div class="lds-dual-ring"></div></div>}
        </div>
        <Chatbot />
      </main>
      <Footer />
    </>
  );
}
