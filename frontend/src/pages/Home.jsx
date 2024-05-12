
import { useState } from "react";
import "../styles/Home.css";
import PopupChat from "../components/PopupChat";
import RollDice from "../components/RollDice";
import ScoreCard from "../components/ScoreCard";

const Home = () => {
  const [openChat, setOpenChat] = useState(false);
  const [openScoreCard, setOpenScoreCard] = useState(false);

  const openPopupChat = () => {
    setOpenChat(!openChat);
  };

  const closePopupChat = () => {
    setOpenChat(false);
  };

  const toggleScoreCard = () => {
    setOpenScoreCard(!openScoreCard);
  };

  return (
    <main className="home">
      <div className="container-action-btn">
        <button className="action-btn">
          <i className="fa-solid fa-gear"></i>
        </button>
        <button onClick={openPopupChat} className="action-btn">
          <i className="fa-solid fa-comments"></i>
        </button>
        <button onClick={toggleScoreCard} className="action-btn">
          <i className="fa-solid fa-list"></i>
        </button>
      </div>
      <div>
        <RollDice />
      </div>
      <ScoreCard openScoreCard={openScoreCard} closeScoreCard={toggleScoreCard} />
      <PopupChat openChat={openChat} closePopupChat={closePopupChat} />
    </main>
  );
};

export default Home;
