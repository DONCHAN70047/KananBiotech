import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import robotImage from "/RobotPic11.png"; // replace with your path

const ChatBotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Hello! I’m your KBT Assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newUserMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "💬 Got it! Let me check that for you..." },
      ]);
    }, 800);
  };

  return (
    <>
      {/* 🤖 Floating Robot Button (hidden when chat open) */}
      {!isOpen && (
        <motion.div
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.1 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="chatbot-floating-btn"
        >
          <img src={robotImage} alt="Chatbot Robot" className="chatbot-robot" />
        </motion.div>
      )}

      {/* 💬 Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
            className="chatbot-window"
          >
            {/* Header */}
            <div className="chatbot-header">
              <img src={robotImage} alt="Bot" className="chatbot-header-img" />
              <h3 className="chatbot-header-title">KBT Smart Assistant</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="chatbot-close"
              >
                ✖
              </button>
            </div>

            {/* Messages */}
            <div className="chatbot-messages">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: m.from === "user" ? 40 : -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`chatbot-msg ${m.from === "user" ? "user" : "bot"}`}
                >
                  {m.text}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Section */}
            <div className="chatbot-input-container">
              <input
                type="text"
                placeholder="Type a message..."
                className="chatbot-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button onClick={handleSend} className="chatbot-send-btn">
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBotWidget;
