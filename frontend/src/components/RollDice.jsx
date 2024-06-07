import React, { useState, useEffect } from "react";
import Dice from "./Dice";
import TotalScore from "./TotalScore";
import ScoreCard from "./ScoreCard";
import "../styles/Dice.css";

const RollDice = ({ sides }) => {
  const initialDice = Array(5)
    .fill()
    .map(() => sides[Math.floor(Math.random() * sides.length)]);
  const [dice, setDice] = useState(initialDice);
  const [heldDice, setHeldDice] = useState([false, false, false, false, false]);
  const [rolling, setRolling] = useState(false);
  const [rollCount, setRollCount] = useState(0);
  const [scores, setScores] = useState({});
  const [potentialScores, setPotentialScores] = useState({});
  const maxRolls = 3;

  const roll = () => {
    if (rollCount >= maxRolls || rolling) {
      return;
    }

    setRolling(true);

    const newDice = dice.map((die, index) =>
      heldDice[index] ? die : sides[Math.floor(Math.random() * sides.length)]
    );

    setDice(newDice);
    setRollCount(rollCount + 1);

    setTimeout(() => {
      setRolling(false);
    }, 1000);
  };

  const toggleHold = (index) => {
    if (rollCount === 0) {
      return;
    }

    const newHeldDice = [...heldDice];
    newHeldDice[index] = !newHeldDice[index];
    setHeldDice(newHeldDice);
  };

  const calculatePotentialScores = () => {
    const counts = [0, 0, 0, 0, 0, 0];
    dice.forEach((die) => {
      const value = Object.values(die)[0];
      counts[value - 1]++;
    });

    const newPotentialScores = {
      Un: counts[0] * 1,
      Deux: counts[1] * 2,
      Trois: counts[2] * 3,
      Quatre: counts[3] * 4,
      Cinq: counts[4] * 5,
      Six: counts[5] * 6,
      Brelan: counts.some((count) => count >= 3)
        ? dice.reduce((acc, die) => acc + Object.values(die)[0], 0)
        : 0,
      Carré: counts.some((count) => count >= 4)
        ? dice.reduce((acc, die) => acc + Object.values(die)[0], 0)
        : 0,
      Full: counts.includes(3) && counts.includes(2) ? 25 : 0,
      "Petite Suite":
        [0, 1, 2, 3].every((i) => counts[i] >= 1) ||
        [1, 2, 3, 4].every((i) => counts[i] >= 1) ||
        [2, 3, 4, 5].every((i) => counts[i] >= 1)
          ? 25
          : 0,
      "Grande Suite":
        [0, 1, 2, 3, 4].every((i) => counts[i] >= 1) ||
        [1, 2, 3, 4, 5].every((i) => counts[i] >= 1)
          ? 40
          : 0,
      Yams: counts.some((count) => count === 5) ? 50 : 0,
      Chance: dice.reduce((acc, die) => acc + Object.values(die)[0], 0),
    };

    setPotentialScores(newPotentialScores);
  };

  const updateScore = (category) => {
    const newScores = { ...scores };
    newScores[category] = potentialScores[category];
    setScores(newScores);
    setDice(initialDice);
    setHeldDice([false, false, false, false, false]);
    setRollCount(0);
  };

  const markAsStruck = (category) => {
    const newPotentialScores = { ...potentialScores };
    newPotentialScores[category] = null;
    setPotentialScores(newPotentialScores);
  };

  useEffect(() => {
    calculatePotentialScores();
  }, [dice, heldDice]);

  return (
    <div className="container">
      <div className="roll-dice">
        {dice.map((die, index) => (
          <Dice
            key={index}
            face={Object.keys(die)[0]}
            rolling={rolling}
            onClick={() => toggleHold(index)}
            held={heldDice[index]}
          />
        ))}
      </div>
      <button
        onClick={roll}
        disabled={rolling || rollCount >= maxRolls}
        className="btn-roll"
      >
        {rolling
          ? "En cours..."
          : rollCount === 0
          ? "Lancer les dés"
          : `Il te reste ${maxRolls - rollCount} lancé(s)`}
      </button>
      <TotalScore dice={dice} heldDice={heldDice} />
      <ScoreCard
        scores={scores}
        potentialScores={potentialScores}
        updateScore={updateScore}
        markAsStruck={markAsStruck}
      />
    </div>
  );
};

RollDice.defaultProps = {
  sides: [
    { one: 1 },
    { two: 2 },
    { three: 3 },
    { four: 4 },
    { five: 5 },
    { six: 6 },
  ],
};

export default RollDice;
