import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/PopupChat.css";
import io from "socket.io-client";

const PopupChat = ({ openChat, closePopupChat }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    socketRef.current.on("connect", () => {
      console.log("Connected to socket.io server");
    });

    socketRef.current.on("disconnect", () => {
      console.log("Disconnected from socket.io server");
    });

    socketRef.current.on("chat_message", (msg) => {
      console.log("Received message:", msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    const messageData = { user: "Username", message: newMessage };
    socketRef.current.emit("chat_message", messageData);
    setNewMessage("");
  };

  const popupVariants = {
    hidden: { x: "35rem" },
    visible: { x: "0rem" },
  };

  return (
    <AnimatePresence>
      {openChat && (
        <motion.section
          className="chat"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={popupVariants}
          transition={{ duration: 0.4 }}
        >
          <div className="close-container">
            <button onClick={closePopupChat} className="close-btn">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="chat-container">
            <ul className="list-chat">
              {messages.map((message, index) => (
                <li key={index}>
                  <div className="message-section">
                    <p className="user">{message.user}</p>
                    <p className="content">{message.message}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="message-container">
            <input
              type="text"
              placeholder="Message..."
              className="input-message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button className="send-message-btn" onClick={sendMessage}>
              Envoyer
            </button>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default PopupChat;
