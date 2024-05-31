import React, { useState } from "react";
import "../styles/ScoreCard.css";

const ScoreCard = ({ scores, potentialScores, updateScore, markAsStruck }) => {
  const [struckCategories, setStruckCategories] = useState({});

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

  const upperTotal = upperSection.reduce(
    (total, category) => total + (scores[category.name] || 0),
    0
  );
  const lowerTotal = lowerSection.reduce(
    (total, category) => total + (scores[category.name] || 0),
    0
  );
  const bonus = upperTotal >= 63 ? 35 : 0;
  const grandTotal = upperTotal + bonus + lowerTotal;

  const handleMarkAsStruck = (categoryName) => {
    setStruckCategories((prev) => ({ ...prev, [categoryName]: true }));
    markAsStruck(categoryName);
  };

  return (
    <div className="score-card">
      <h2>Feuille de Score</h2>
      <table>
        <thead>
          <tr>
            <th>Catégorie</th>
            <th>Score</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {upperSection.map((category, index) => (
            <tr
              key={index}
              className={
                scores[category.name] !== undefined
                  ? "validated"
                  : struckCategories[category.name]
                  ? "barré"
                  : ""
              }
            >
              <td>{category.display}</td>
              <td>
                {scores[category.name] !== undefined
                  ? scores[category.name]
                  : potentialScores[category.name] !== null
                  ? potentialScores[category.name]
                  : "Barré"}
              </td>
              <td>
                <button
                  onClick={() => updateScore(category.name)}
                  disabled={
                    scores[category.name] !== undefined ||
                    potentialScores[category.name] === null ||
                    struckCategories[category.name]
                  }
                >
                  Valider
                </button>
                <button
                  onClick={() => handleMarkAsStruck(category.name)}
                  disabled={
                    scores[category.name] !== undefined ||
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
            <td>{bonus}</td>
            <td></td>
          </tr>
          <tr className="total-row">
            <td>Total supérieur</td>
            <td>{upperTotal + bonus}</td>
            <td></td>
          </tr>
          {lowerSection.map((category, index) => (
            <tr
              key={index}
              className={
                scores[category.name] !== undefined
                  ? "validated"
                  : struckCategories[category.name]
                  ? "barré"
                  : ""
              }
            >
              <td>{category.display}</td>
              <td>
                {scores[category.name] !== undefined
                  ? scores[category.name]
                  : potentialScores[category.name] !== null
                  ? potentialScores[category.name]
                  : "Barré"}
              </td>
              <td>
                <button
                  onClick={() => updateScore(category.name)}
                  disabled={
                    scores[category.name] !== undefined ||
                    potentialScores[category.name] === null ||
                    struckCategories[category.name]
                  }
                >
                  Valider
                </button>
                <button
                  onClick={() => handleMarkAsStruck(category.name)}
                  disabled={
                    scores[category.name] !== undefined ||
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
            <td>{lowerTotal}</td>
            <td></td>
          </tr>
          <tr className="total-row">
            <td>Total général</td>
            <td>{grandTotal}</td>
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

export default ScoreCard;
