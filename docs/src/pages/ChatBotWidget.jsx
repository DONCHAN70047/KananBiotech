import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import robotImage from "/RobotPic11.png"; // ✅ ensure this path is correct

const ChatBotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "<b>👋 Hello!</b><br/>I’m your <b>KBT Assistant</b>.<br/>How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // ✅ Auto-scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Send message to Django backend
  const handleSend = async () => {
    if (!input.trim()) return;

    const newUserMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error(`Server Error: ${response.status}`);

      const data = await response.json();

      // ✅ The backend should send 'reply' as HTML-formatted text
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text:
            data.reply ||
            "<b>🤖 Sorry!</b><br/>I didn’t get that. Please try again.",
        },
      ]);
    } catch (error) {
      console.error("❌ ChatBot Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text:
            "<b>⚠️ Network Error</b><br/>Please try again or check your connection.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <motion.div
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.1 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="chatbot-floating-btn"
        >
          <img src={robotImage} alt="Chatbot" className="chatbot-robot" />
        </motion.div>
      )}

      {/* Chat Window */}
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
                aria-label="Close Chat"
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
                  dangerouslySetInnerHTML={{ __html: m.text }} // ✅ Render HTML
                />
              ))}

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="chatbot-msg bot"
                >
                  💭 Typing...
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
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
