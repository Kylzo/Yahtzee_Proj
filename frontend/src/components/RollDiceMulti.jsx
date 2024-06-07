import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Dice from "./Dice";
import TotalScore from "./TotalScore";
import ScoreCardMulti from "./ScoreCardMulti";
import "../styles/Dice.css";

const socket = io("http://localhost:3001"); // Remplacez par l'URL de votre serveur si nécessaire

const RollDiceMulti = ({ sides }) => {
  const initialDice = Array(5)
    .fill()
    .map(() => sides[Math.floor(Math.random() * sides.length)]);
  const [dice, setDice] = useState(initialDice);
  const [heldDice, setHeldDice] = useState([false, false, false, false, false]);
  const [rolling, setRolling] = useState(false);
  const [rollCount, setRollCount] = useState(0);
  const [scores, setScores] = useState([{}, {}]); // Initialisé comme un tableau de deux objets vides
  const [potentialScores, setPotentialScores] = useState({});
  const [currentPlayer, setCurrentPlayer] = useState(0); // Suivre le joueur actuel
  const maxRolls = 3;

  const playerColors = ["#FFDDC1", "#C1E1FF"]; // Couleurs pour chaque joueur

  useEffect(() => {
    socket.on("gameState", (gameState) => {
      setDice(gameState.dice);
      setHeldDice(gameState.heldDice);
      setRolling(gameState.rolling);
      setRollCount(gameState.rollCount);
      setScores(gameState.scores);
      setCurrentPlayer(gameState.currentPlayer);
    });

    return () => {
      socket.off("gameState");
    };
  }, []);

  const roll = () => {
    if (rollCount >= maxRolls || rolling) {
      return;
    }

    setRolling(true);

    const newDice = dice.map((die, index) =>
      heldDice[index] ? die : sides[Math.floor(Math.random() * sides.length)]
    );

    const newRollCount = rollCount + 1;
    const newRolling = false;

    setDice(newDice);
    setRollCount(newRollCount);

    setTimeout(() => {
      setRolling(newRolling);
      const newGameState = {
        dice: newDice,
        heldDice,
        rolling: newRolling,
        rollCount: newRollCount,
        scores,
        currentPlayer,
      };
      socket.emit("updateGameState", newGameState);
    }, 1000);
  };

  const toggleHold = (index) => {
    if (rollCount === 0) {
      return;
    }

    const newHeldDice = [...heldDice];
    newHeldDice[index] = !newHeldDice[index];
    setHeldDice(newHeldDice);
    const newGameState = {
      dice,
      heldDice: newHeldDice,
      rolling,
      rollCount,
      scores,
      currentPlayer,
    };
    socket.emit("updateGameState", newGameState);
  };

  const calculatePotentialScores = () => {
    const counts = [0, 0, 0, 0, 0, 0];
    dice.forEach((die) => {
      const value = Object.values(die)[0];
      counts[value - 1]++;
    });

    const newPotentialScores = {};
    newPotentialScores["Un"] = counts[0] * 1;
    newPotentialScores["Deux"] = counts[1] * 2;
    newPotentialScores["Trois"] = counts[2] * 3;
    newPotentialScores["Quatre"] = counts[3] * 4;
    newPotentialScores["Cinq"] = counts[4] * 5;
    newPotentialScores["Six"] = counts[5] * 6;

    // Brelan
    newPotentialScores["Brelan"] = counts.some((count) => count >= 3)
      ? dice.reduce((acc, die) => acc + Object.values(die)[0], 0)
      : 0;

    // Carré
    newPotentialScores["Carré"] = counts.some((count) => count >= 4)
      ? dice.reduce((acc, die) => acc + Object.values(die)[0], 0)
      : 0;

    // Full House
    newPotentialScores["Full"] =
      counts.includes(3) && counts.includes(2) ? 25 : 0;

    // Petite Suite
    newPotentialScores["Petite Suite"] = [0, 1, 2, 3].every(
      (i) => counts[i] >= 1
    )
      ? 25
      : [1, 2, 3, 4].every((i) => counts[i] >= 1)
      ? 25
      : [2, 3, 4, 5].every((i) => counts[i] >= 1)
      ? 25
      : 0;

    // Grande Suite
    newPotentialScores["Grande Suite"] = [0, 1, 2, 3, 4].every(
      (i) => counts[i] >= 1
    )
      ? 40
      : [1, 2, 3, 4, 5].every((i) => counts[i] >= 1)
      ? 40
      : 0;

    // Yams
    newPotentialScores["Yams"] = counts.some((count) => count === 5) ? 50 : 0;

    // Chance
    newPotentialScores["Chance"] = dice.reduce(
      (acc, die) => acc + Object.values(die)[0],
      0
    );

    setPotentialScores(newPotentialScores);
  };

  const updateScore = (category) => {
    const newScores = [...scores];
    newScores[currentPlayer][category] = potentialScores[category];
    setScores(newScores);
    setDice(initialDice);
    setHeldDice([false, false, false, false, false]);
    setRollCount(0);
    const newCurrentPlayer = (currentPlayer + 1) % 2; // Changer de joueur
    setCurrentPlayer(newCurrentPlayer);
    const newGameState = {
      dice: initialDice,
      heldDice: [false, false, false, false, false],
      rolling: false,
      rollCount: 0,
      scores: newScores,
      currentPlayer: newCurrentPlayer,
    };
    socket.emit("updateGameState", newGameState);
  };

  const markAsStruck = (category) => {
    const newPotentialScores = { ...potentialScores };
    newPotentialScores[category] = null;
    setPotentialScores(newPotentialScores);
    const newGameState = {
      dice,
      heldDice,
      rolling,
      rollCount,
      scores,
      currentPlayer,
    };
    socket.emit("updateGameState", newGameState);
  };

  useEffect(() => {
    calculatePotentialScores();
  }, [dice, heldDice]);

  return (
    <div className="container">
      <h1>Joueur {currentPlayer + 1}</h1>
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
        style={
          rollCount >= maxRolls
            ? { cursor: "not-allowed", background: "red" }
            : rollCount >= 0
            ? { cursor: "pointer", background: "green" }
            : { cursor: "pointer" }
        }
        className="btn-roll"
      >
        {rolling
          ? "En cours..."
          : rollCount === 0
          ? "Lancer les dés"
          : `Il te reste ${maxRolls - rollCount} lancé(s)`}
      </button>
      <TotalScore dice={dice} heldDice={heldDice} />
      <ScoreCardMulti
        scores={scores}
        setScores={setScores}
        potentialScores={potentialScores}
        updateScore={updateScore}
        markAsStruck={markAsStruck}
        playerColors={playerColors}
      />
      <div className="player-scores">
        <h2>Scores des joueurs</h2>
        {scores.map((playerScores, index) => (
          <div key={index} style={{ backgroundColor: playerColors[index] }}>
            <h3>Joueur {index + 1}</h3>
            <ul>
              {Object.entries(playerScores).map(([category, score], idx) => (
                <li key={idx}>
                  {category}: {score}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

RollDiceMulti.defaultProps = {
  sides: [
    { one: 1 },
    { two: 2 },
    { three: 3 },
    { four: 4 },
    { five: 5 },
    { six: 6 },
  ],
};

export { RollDiceMulti as default, socket };
