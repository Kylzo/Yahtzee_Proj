import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const response = await fetch("http://localhost:3000/api/current-user", {
        method: "GET",
      });
      if (response.ok) {
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();
  }, []);

  const handleButtonClick = (multiplayer = false) => {
    if (isLoggedIn) {
      navigate("/jeu", { state: { multiplayer } });
    } else {
      setShowLoginMessage(true);
      setTimeout(() => {
        navigate("/connexion");
      }, 1000); // Afficher la page de connexion après 3 secondes
    }
  };

  return (
    <main className="home">
      <div className="home-group">
        <h1>Yahtzee</h1>
        <p className="home-description">
          Venez jouer au meilleur jeu de tous les temps !
          <br />
          Vous ne serez absolument pas déçu et vivrez une expérience incroyable
          !
        </p>
        <div className="home-container-button">
          <button onClick={() => handleButtonClick(true)}>
            Jouer en multijoueur
          </button>
          <button onClick={() => handleButtonClick(false)}>
            Jouer en solo
          </button>
        </div>
        {showLoginMessage && (
          <p className="login-message">
            Vous devez être connecté pour jouer. Redirection vers la page de
            connexion...
          </p>
        )}
      </div>
    </main>
  );
};

export default Home;
