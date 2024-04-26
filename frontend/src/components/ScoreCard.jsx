import React from "react";

const ScoreCard = ({ scores, onScoreSelect }) => {
  const handleClick = (category) => {
    if (!scores[category].used) {
      onScoreSelect(category);
    }
  };

  return (
    <div className="score-card">
      <h2>Score Card</h2>
      <table>
        <thead>
          <tr>
            <th>Catégorie</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(scores).map((category, index) => (
            <tr key={index}>
              <td>{category}</td>
              <td>
                {scores[category].used ? (
                  <span>{scores[category].value}</span>
                ) : (
                  <button onClick={() => handleClick(category)}>
                    Remplir
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreCard;
