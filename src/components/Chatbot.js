import React, { useState, useEffect } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [initialMessageAdded, setInitialMessageAdded] = useState(false); 
  const [chatOpen, setChatOpen] = useState(false);

  const categories = [
    "business", "change", "dating", "death", "dreams", "education", "failure", "faith", "family",
    "fear", "fitness",  "forgiveness", "freedom", "friendship", "future", "god",
    "happiness", "health", "history", "home", "hope",
    "inspirational", "intelligence", "knowledge", "leadership", "learning", 
    "life", "love", "money", "movies", "success"
  ];

  useEffect(() => {
    if (!initialMessageAdded && chatOpen) {
      fetchMessage("Hello");
      setInitialMessageAdded(true);
    }
  }, [initialMessageAdded, chatOpen]);

  const fetchMessage = (userInput) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "assistant", content: "You can get inspired by typing 'quote'" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (input.trim() !== "") {
      setMessages((prevMessages) => [...prevMessages, { role: "user", content: input }]);

      if (input.toLowerCase().includes("quote")) {
        await fetchRandomInspirationalQuote();
      } else {
        await fetchMessage(input);
      }

      setInput("");
    }
  };

  const toggleChat = () => {
    setInitialMessageAdded(false); 
    setMessages([]);
    setChatOpen((prevChatOpen) => !prevChatOpen);
  };

  const fetchRandomInspirationalQuote = async () => {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];

    try {
      const response = await axios.get(`https://api.api-ninjas.com/v1/quotes?category=${randomCategory}`, {
        headers: { 'X-Api-Key': 'QCK30auHJEGcXQxEoo2K6Q==1lcoxl1IDmmJRPu7' },
      });

      if (response.data && response.data.length > 0) {
        const quote = response.data[0].quote;
        const author = response.data[0].author;

        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "assistant", content: `"${quote}" - ${author} (Category: ${randomCategory})` },
        ]);
      }
      
    } catch (error) {
      console.error('Error fetching inspirational quote:', error);
    }
  };

  return (
    <div className={`chatbot-container ${chatOpen ? "chatbot-open" : ""}`}>
      {chatOpen && (
        <div className="chatbot">
          <div className="chatbot__messages">
            {messages.map((message, index) => (
              <div key={index} className={`message message_${message.role}`}>
                {message.content}
              </div>
            ))}
          </div>
          <form className="chatbot__form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
      <button className="chatbot-toggle" onClick={toggleChat}>
        {chatOpen ? "Close" : "Open Chat"}
      </button>
    </div>
  );
};

export default Chatbot;
