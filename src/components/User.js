import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Chatbot from "./Chatbot";

export default function UserPage() {
  const [entry, setEntry] = useState("");
  const [category, setCategory] = useState("Personal");
  const [attachment, setAttachment] = useState(null);
  const [entries, setEntries] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    setEntry(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    setAttachment(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (entry.trim() !== "") {
      if (editIndex !== null) {
        const updatedEntries = [...entries];
        updatedEntries[editIndex].text = entry;
        updatedEntries[editIndex].category = category;
        updatedEntries[editIndex].attachment = attachment;
        setEntries(updatedEntries);
        setEditIndex(null);
      } else {
        const newEntry = {
          text: entry,
          timestamp: new Date().toLocaleString(),
          category: category,
          attachment: attachment,
        };
        setEntries([...entries, newEntry]);
      }
      setEntry("");
      setCategory("Personal");
      setAttachment(null);
    }
  };

  const handleDelete = (index) => {
    const newEntries = [...entries];
    newEntries.splice(index, 1);
    setEntries(newEntries);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEntry(entries[index].text);
    setCategory(entries[index].category || "Personal");
    setAttachment(entries[index].attachment || null);
  };

  const handleAddToJournal = (quote) => {
    const newEntry = {
      text: quote,
      timestamp: new Date().toLocaleString(),
      attachment: null, 
    };
    setEntries([...entries, newEntry]);
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
              <label className="journal__label" htmlFor="attachment">
                <h3 className="journal__subtitle">Attachment:</h3>
              </label>
              <input
              className="journal__attachment"
                type="file"
                id="attachment"
                accept="image/*, application/pdf" 
                onChange={handleAttachmentChange}
              />
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
                    <th>Attachment</th>
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
                      <td>{item.attachment ? item.attachment.name : "None"}</td>
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
                          onClick={() => handleDelete(index)}
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
