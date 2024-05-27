import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PopupChat from "../components/PopupChat";
import RollDice from "../components/RollDice";
import "../styles/Jeu.css";

const Jeu = () => {
  const [openChat, setOpenChat] = useState(false);
  const location = useLocation();
  const { multiplayer, id_game } = location.state || {
    multiplayer: false,
    id_game: null,
  };

  const openPopupChat = () => {
    setOpenChat(!openChat);
  };

  const closePopupChat = () => {
    setOpenChat(false);
  };

  return (
    <main className="jeu">
      <div className="container-action-btn">
        <button className="action-btn">
          <i className="fa-solid fa-gear"></i>
        </button>
        <button onClick={openPopupChat} className="action-btn">
          <i className="fa-solid fa-comments"></i>
        </button>
      </div>

      <div>
        <RollDice />
      </div>

      <div className="game-mode">
        {multiplayer ? <p>Mode Multijoueur</p> : <p>Mode Solo</p>}
      </div>

      <PopupChat
        openChat={openChat}
        closePopupChat={closePopupChat}
        id_game={id_game}
      />
    </main>
  );
};

export default Jeu;
