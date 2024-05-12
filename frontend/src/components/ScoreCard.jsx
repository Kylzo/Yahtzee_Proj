import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/ScoreCard.css";

const ScoreCard = ({ openScoreCard}) => {
  const [scores, setScores] = useState({
    Un: null,
    Deux: null,
    Trois: null,
    Quatre: null,
    Cinq: null,
    Six: null,
    Brelan: null,
    Carré: null,
    Full: null,
    PetiteSuite: null,
    GrandeSuite: null,
    Yahtzee: null,
    Chance: null,
    Bonus: null
  });

  const [upperTotal, setUpperTotal] = useState(0);
  const [lowerTotal, setLowerTotal] = useState(0);
  const [total, setTotal] = useState(0);

  const updateScore = (category, score) => {
    setScores(prevScores => ({
      ...prevScores,
      [category]: score
    }));
  };

  useEffect(() => {
    const calculateTotals = () => {
      let upperTotal = 0;
      let lowerTotal = 0;

      ['Un', 'Deux', 'Trois', 'Quatre', 'Cinq', 'Six'].forEach(category => {
        if (scores[category] !== null && !isNaN(scores[category])) {
          upperTotal += scores[category];
        }
      });

      ['Brelan', 'Carré', 'Full', 'PetiteSuite', 'GrandeSuite', 'Yahtzee', 'Chance'].forEach(category => {
        if (scores[category] !== null && !isNaN(scores[category])) {
          lowerTotal += scores[category];
        }
      });

      if (upperTotal >= 63) {
        upperTotal += 35;
        updateScore('Bonus', 35);
      } else {
        updateScore('Bonus', null);
      }

      setUpperTotal(upperTotal);
      setLowerTotal(lowerTotal);

      const total = upperTotal + lowerTotal;
      setTotal(total);
    };

    calculateTotals();
  }, [scores]);

  const popupVariants = {
    hidden: { y: "200vw" },
    visible: { y: 0 },
    exit: { y: "200vw" }
  };

  return (
    <AnimatePresence>
      {openScoreCard && (
        <motion.div
          className={`score-card-container ${openScoreCard ? "open" : ""}`}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={popupVariants}
          transition={{ duration: 0.4 }}
        >
          <div className="score-card">
            <h2 className="score-title">Grille de score</h2>
            <div className="score-sections">
              <div className="score-section">
                <h3>Partie haute</h3>
                <div className="score-group">
                  {['Un', 'Deux', 'Trois', 'Quatre', 'Cinq', 'Six'].map(category => (
                    <div className="score-item" key={category}>
                      <span>{category}</span>
                      <input type="number" value={scores[category] || ''} onChange={(e) => updateScore(category, parseInt(e.target.value))} />
                    </div>
                  ))}
                  <div className="score-item bonus">
                    <span>Bonus (63+)</span>
                    <span>{scores.Bonus}</span>
                  </div>
                  <div className="score-item">
                    <span>Total partie haute :</span>
                    <span>{upperTotal}</span>
                  </div>
                </div>
              </div>
              <div className="score-section">
                <h3>Partie basse</h3>
                <div className="score-group">
                  {['Brelan', 'Carré', 'Full', 'PetiteSuite', 'GrandeSuite', 'Yahtzee', 'Chance'].map(category => (
                    <div className="score-item" key={category}>
                      <span>{category}</span>
                      <input type="number" value={scores[category] || ''} onChange={(e) => updateScore(category, parseInt(e.target.value))} />
                    </div>
                  ))}
                  <div className="score-item">
                    <span>Total partie basse :</span>
                    <span>{lowerTotal}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="score-item total">
              <span>Total : </span>
              <span>{total} </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScoreCard;
