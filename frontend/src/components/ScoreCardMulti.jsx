import React, { useState, useEffect } from "react";
import "../styles/ScoreCardMulti.css";
import { socket } from "./RollDiceMulti";

const ScoreCardMulti = ({
  scores,
  setScores,
  potentialScores,
  updateScore,
  markAsStruck,
  playerColors,
}) => {
  const [struckCategories, setStruckCategories] = useState({});

  useEffect(() => {
    socket.on("updateScores", (newScores) => {
      setScores(newScores);
    });

    socket.on("markCategoryAsStruck", (category) => {
      setStruckCategories((prev) => ({ ...prev, [category]: true }));
    });

    return () => {
      socket.off("updateScores");
      socket.off("markCategoryAsStruck");
    };
  }, [setScores]);

  const categories = [
    { name: "Un", display: "1 (total des 1)" },
    { name: "Deux", display: "2 (total des 2)" },
    { name: "Trois", display: "3 (total des 3)" },
    { name: "Quatre", display: "4 (total des 4)" },
    { name: "Cinq", display: "5 (total des 5)" },
    { name: "Six", display: "6 (total des 6)" },
    { name: "Brelan", display: "Brelan (Somme des 5 dés)" },
    { name: "Carré", display: "Carré (Somme des 5 dés)" },
    { name: "Full", display: "Full House (25 points)" },
    { name: "Petite Suite", display: "Petite suite (25 points)" },
    { name: "Grande Suite", display: "Grande suite (40 points)" },
    { name: "Yams", display: "Yams (50)" },
    { name: "Chance", display: "Chance (Somme des 5 dés)" },
  ];

  const upperSection = categories.slice(0, 6);
  const lowerSection = categories.slice(6);

  const upperTotal = (playerIndex) =>
    upperSection.reduce(
      (total, category) => total + (scores[playerIndex][category.name] || 0),
      0
    );
  const lowerTotal = (playerIndex) =>
    lowerSection.reduce(
      (total, category) => total + (scores[playerIndex][category.name] || 0),
      0
    );
  const bonus = (playerIndex) => (upperTotal(playerIndex) >= 63 ? 35 : 0);
  const grandTotal = (playerIndex) =>
    upperTotal(playerIndex) + bonus(playerIndex) + lowerTotal(playerIndex);

  const handleMarkAsStruck = (categoryName) => {
    setStruckCategories((prev) => ({ ...prev, [categoryName]: true }));
    markAsStruck(categoryName);
    socket.emit("markCategoryAsStruck", categoryName);
  };

  return (
    <div className="score-card">
      <h2>Feuille de Score Multijoueur</h2>
      <table>
        <thead>
          <tr>
            <th>Catégorie</th>
            {Array.isArray(scores) &&
              scores.map((_, index) => (
                <th
                  key={index}
                  style={{ backgroundColor: playerColors[index] }}
                >
                  Joueur {index + 1}
                </th>
              ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {upperSection.map((category, index) => (
            <tr key={index}>
              <td>{category.display}</td>
              {Array.isArray(scores) &&
                scores.map((playerScores, playerIndex) => (
                  <td
                    key={playerIndex}
                    className={
                      playerScores[category.name] !== undefined
                        ? "validated"
                        : struckCategories[category.name]
                        ? "barré"
                        : ""
                    }
                    style={{ backgroundColor: playerColors[playerIndex] }}
                  >
                    {playerScores[category.name] !== undefined
                      ? playerScores[category.name]
                      : potentialScores[category.name] !== null
                      ? potentialScores[category.name]
                      : "Barré"}
                  </td>
                ))}
              <td>
                <button
                  onClick={() => {
                    updateScore(category.name);
                    socket.emit("updateScores", scores);
                  }}
                  disabled={
                    scores.some(
                      (playerScores) =>
                        playerScores[category.name] !== undefined
                    ) ||
                    potentialScores[category.name] === null ||
                    struckCategories[category.name]
                  }
                >
                  Valider
                </button>
                <button
                  onClick={() => handleMarkAsStruck(category.name)}
                  disabled={
                    scores.some(
                      (playerScores) =>
                        playerScores[category.name] !== undefined
                    ) ||
                    potentialScores[category.name] === null ||
                    struckCategories[category.name]
                  }
                >
                  Barrer
                </button>
              </td>
            </tr>
          ))}
          <tr className="total-row">
            <td>Bonus si total ≥ 63</td>
            {Array.isArray(scores) &&
              scores.map((_, playerIndex) => (
                <td
                  key={playerIndex}
                  style={{ backgroundColor: playerColors[playerIndex] }}
                >
                  {bonus(playerIndex)}
                </td>
              ))}
            <td></td>
          </tr>
          <tr className="total-row">
            <td>Total supérieur</td>
            {Array.isArray(scores) &&
              scores.map((_, playerIndex) => (
                <td
                  key={playerIndex}
                  style={{ backgroundColor: playerColors[playerIndex] }}
                >
                  {upperTotal(playerIndex) + bonus(playerIndex)}
                </td>
              ))}
            <td></td>
          </tr>
          {lowerSection.map((category, index) => (
            <tr key={index}>
              <td>{category.display}</td>
              {Array.isArray(scores) &&
                scores.map((playerScores, playerIndex) => (
                  <td
                    key={playerIndex}
                    className={
                      playerScores[category.name] !== undefined
                        ? "validated"
                        : struckCategories[category.name]
                        ? "barré"
                        : ""
                    }
                    style={{ backgroundColor: playerColors[playerIndex] }}
                  >
                    {playerScores[category.name] !== undefined
                      ? playerScores[category.name]
                      : potentialScores[category.name] !== null
                      ? potentialScores[category.name]
                      : "Barré"}
                  </td>
                ))}
              <td>
                <button
                  onClick={() => {
                    updateScore(category.name);
                    socket.emit("updateScores", scores);
                  }}
                  disabled={
                    scores.some(
                      (playerScores) =>
                        playerScores[category.name] !== undefined
                    ) ||
                    potentialScores[category.name] === null ||
                    struckCategories[category.name]
                  }
                >
                  Valider
                </button>
                <button
                  onClick={() => handleMarkAsStruck(category.name)}
                  disabled={
                    scores.some(
                      (playerScores) =>
                        playerScores[category.name] !== undefined
                    ) ||
                    potentialScores[category.name] === null ||
                    struckCategories[category.name]
                  }
                >
                  Barrer
                </button>
              </td>
            </tr>
          ))}
          <tr className="total-row">
            <td>Total inférieur</td>
            {Array.isArray(scores) &&
              scores.map((_, playerIndex) => (
                <td
                  key={playerIndex}
                  style={{ backgroundColor: playerColors[playerIndex] }}
                >
                  {lowerTotal(playerIndex)}
                </td>
              ))}
            <td></td>
          </tr>
          <tr className="total-row">
            <td>Total général</td>
            {Array.isArray(scores) &&
              scores.map((_, playerIndex) => (
                <td
                  key={playerIndex}
                  style={{ backgroundColor: playerColors[playerIndex] }}
                >
                  {grandTotal(playerIndex)}
                </td>
              ))}
            <td></td>
          </tr>
        </tbody>
      </table>
      <div className="combinations-info">
        <h3>Rappel des combinaisons :</h3>
        <ul>
          <li>
            <strong>Brelan :</strong> 3 dés identiques
          </li>
          <li>
            <strong>Carré :</strong> 4 dés identiques
          </li>
          <li>
            <strong>Full House :</strong> Paire + Brelan
          </li>
          <li>
            <strong>Petite Suite :</strong> 4 dés qui se suivent
          </li>
          <li>
            <strong>Grande Suite :</strong> 5 dés qui se suivent
          </li>
          <li>
            <strong>Yams :</strong> 5 dés de même valeur
          </li>
          <li>
            <strong>Chance :</strong> Somme des valeurs des 5 dés
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ScoreCardMulti;
