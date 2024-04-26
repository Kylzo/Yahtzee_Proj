import "../styles/PopupChat.css";
import { motion, AnimatePresence } from "framer-motion";

const chatMessages = [
  { id: 1, user: "Theo", content: "Je suis un message" },
  {
    id: 2,
    user: "Theo",
    content:
      "Je suis un message un peu plus long pour voir comment ça rend une fois intégré dans la partie message",
  },
  { id: 3, user: "Theo", content: "Je suis un message" },
  { id: 4, user: "Theo", content: "Je suis un message" },
  { id: 5, user: "Theo", content: "Je suis un message" },
  { id: 5, user: "Theo", content: "Je suis un message" },
  {
    id: 6,
    user: "Theo",
    content:
      "Je suis un message un peu plus long pour voir comment ça rend une fois intégré dans la partie message",
  },
  { id: 7, user: "Theo", content: "Je suis un message" },
  {
    id: 8,
    user: "Theo",
    content:
      "Je suis un message un peu plus long pour voir comment ça rend une fois intégré dans la partie message",
  },
  { id: 9, user: "Theo", content: "Je suis un message" },
  { id: 10, user: "Theo", content: "Je suis un message" },
  {
    id: 11,
    user: "Theo",
    content:
      "Je suis un message un peu plus long pour voir comment ça rend une fois intégré dans la partie message",
  },
  { id: 12, user: "Theo", content: "Je suis un message" },
  { id: 13, user: "Theo", content: "Je suis un message" },
  {
    id: 14,
    user: "Theo",
    content:
      "Je suis un message un peu plus long pour voir comment ça rend une fois intégré dans la partie message",
  },
  { id: 15, user: "Theo", content: "Je suis un message" },
  {
    id: 16,
    user: "Theo",
    content:
      "Je suis un message un peu plus long pour voir comment ça rend une fois intégré dans la partie message",
  },
];

const Message = ({ message }) => {
  return (
    <div className="message-section">
      <p className="user">{message.user}</p>
      <p className="content">{message.content}</p>
    </div>
  );
};

const PopupChat = ({ openChat, closePopupChat }) => {
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
          {/* Close button */}
          <div className="close-container">
            <button onClick={closePopupChat} className="close-btn">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          {/* Chat messages */}
          <div className="chat-container">
            <ul className="list-chat">
              {chatMessages.map((message) => (
                <li key={message.id}>
                  <Message message={message} />
                </li>
              ))}
            </ul>
          </div>

          {/* Input text */}
          <div className="message-container">
            <input
              type="text"
              placeholder="Message..."
              className="input-message"
            />
            <button className="send-message-btn">Envoyer</button>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default PopupChat;
