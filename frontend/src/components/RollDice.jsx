import Dice from "./Dice";
import "../styles/Dice.css";
import { useState } from "react";

const RollDice = ({ sides }) => {
  // Initialiser les dés avec des valeurs aléatoires et créer les états de maintien des dés
  const initialDice = Array(5)
    .fill()
    .map(() => sides[Math.floor(Math.random() * sides.length)]);
  const [dice, setDice] = useState(initialDice);
  const [heldDice, setHeldDice] = useState([false, false, false, false, false]); // Dés retenus
  const [rolling, setRolling] = useState(false);
  const [rollCount, setRollCount] = useState(0);
  const maxRolls = 2;

  const roll = () => {
    if (rollCount >= maxRolls || rolling) {
      return; // Pas de lancer supplémentaire si le maximum est atteint ou si en cours de lancer
    }

    setRolling(true);

    const newDice = dice.map((die, index) =>
      heldDice[index] ? die : sides[Math.floor(Math.random() * sides.length)]
    );

    setDice(newDice);
    setRollCount(rollCount + 1);

    // Arrête le roulement après une seconde
    setTimeout(() => {
      setRolling(false);
    }, 1000);
  };

  const toggleHold = (index) => {
    const newHeldDice = [...heldDice];
    newHeldDice[index] = !newHeldDice[index];
    setHeldDice(newHeldDice);
  };

  return (
    <div className="container">
      {rollCount >= maxRolls && (
        <p className="alert">Vous n'avez plus de lancés</p>
      )}
      <div className="roll-dice">
        {dice.map((die, index) => (
          <Dice
            key={index}
            face={Object.keys(die)[0]} // Afficher la face du dé
            rolling={rolling}
            onClick={() => toggleHold(index)} // Permet de retenir ou de relâcher un dé
            held={heldDice[index]} // Indique si le dé est retenu
          />
        ))}
      </div>
      <button
        onClick={roll}
        disabled={rolling || rollCount >= maxRolls}
        style={
          rolling || rollCount >= maxRolls
            ? { cursor: "not-allowed", background: "#3c3c3c" }
            : { cursor: "pointer" }
        }
        className="btn-roll"
      >
        {rolling ? "En cours..." : `Lancer les dés (${maxRolls - rollCount})`}
      </button>
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
