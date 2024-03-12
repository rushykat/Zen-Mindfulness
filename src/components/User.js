import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Chatbot from "./Chatbot";
import { getDatabase, ref, set, push, remove, onValue, off } from "firebase/database";

export default function UserPage() {
  const [entry, setEntry] = useState("");
  const [category, setCategory] = useState("Personal");
  const [entries, setEntries] = useState([]);
  const [editIndex, setEditIndex] = useState(null);


  const db = getDatabase();

  useEffect(() => {
    const entriesRef = ref(db, 'entries');
    const listener = onValue(entriesRef, (snapshot) => {
      const data = snapshot.val();
      const list = data ? Object.keys(data).map(key => ({ ...data[key], id: key })) : [];
      setEntries(list);
    });

    return () => {
      off(entriesRef, listener);
    };
  }, []);

  const handleInputChange = (e) => {
    setEntry(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (entry.trim() !== "") {
      const newEntry = {
        text: entry,
        timestamp: new Date().toLocaleString(),
        category: category,
      };
      const entriesRef = ref(db, 'entries');
      const newEntryRef = push(entriesRef);
      set(newEntryRef, newEntry);
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
                onChange={handleInputChange}
              />
              <br />
              <label className="journal__label" htmlFor="category">
                <h3 className="journal__subtitle" >Category:</h3>
              </label>
              <select
                id="category"
                className="journal__category"
                value={category}
                onChange={handleCategoryChange}
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
              <table className="journal__table">
                <thead>
                  <tr>
                    <th>Reflection</th>
                    <th>Category</th>
                    <th>Time</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((item, index) => (
                    <tr key={index}>
                      <td>{item.text}</td>
                      <td>{item.category || "Personal"}</td>

                      <td>{item.timestamp}</td>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Chatbot />
      </main>
      <Footer />
    </>
  );
}
