import { useState } from "react";
import PopupChat from "../components/PopupChat";
import RollDice from "../components/RollDice";
import "../styles/Jeu.css";

const Jeu = () => {
  const [openChat, setOpenChat] = useState(false);

  const openPopupChat = () => {
    setOpenChat(!openChat);
  };

  const closePopupChat = () => {
    setOpenChat(false);
  };

  return (
    <main className="jeu">
      {/* Button paramètres */}
      <div className="container-action-btn">
        <button className="action-btn">
          <i className="fa-solid fa-gear"></i>
        </button>
        <button onClick={openPopupChat} className="action-btn">
          <i className="fa-solid fa-comments"></i>
        </button>
      </div>

      {/* Les dés + le boutton pour lancer les dés */}
      <div>
        <RollDice />
      </div>

      {/* Chat */}
      <PopupChat openChat={openChat} closePopupChat={closePopupChat} />
    </main>
  );
};

export default Jeu;
