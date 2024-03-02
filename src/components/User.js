import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function UserPage() {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { id: 1, label: "Current Condition", content: "CONTENT for Tab #1" },
    { id: 2, label: "Sleep", content: "CONTENT for Tab #2" },
    { id: 3, label: "Mindfulness", content: "CONTENT for Tab #3" },
    { id: 4, label: "Activity", content: "CONTENT for Tab #4" },
  ];

  const updateToggle = (id) => {
    setActiveTab(id);
  };

  return (
    <React.Fragment>
      <Header />
      <main>
        <section className="stats" id="stats">
          <div className="container stats__container">
            <h2 className="stats__title">Your Stats</h2>
            <div className="stats__tabs tab">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab__link ${activeTab === tab.id ? "tab__link-active" : ""}`}
                  onClick={() => updateToggle(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`tab__content ${activeTab === tab.id ? "tab__content-active" : ""}`}
              >
                <p>{tab.content}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </React.Fragment>
  );
}
