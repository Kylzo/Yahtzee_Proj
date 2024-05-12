import React, { useState, useRef } from "react";
import Dice from "./Dice";
import TotalScore from "./TotalScore";
import "../styles/Dice.css";

// Importez votre fichier audio roll-sound.mp3
import rollSound from "../assets/roll-sound.mp3";

const RollDice = ({ sides }) => {
  const initialDice = Array(5)
    .fill()
    .map(() => sides[Math.floor(Math.random() * sides.length)]);
  const [dice, setDice] = useState(initialDice);
  const [heldDice, setHeldDice] = useState([false, false, false, false, false]);
  const [rolling, setRolling] = useState(false);
  const [rollCount, setRollCount] = useState(0);
  const maxRolls = 3;
  const audioRef = useRef();

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

    // Jouez le son de déroulement
    audioRef.current.play();

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

  return (
    <div className="container">
      <audio ref={audioRef} src={rollSound} />
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
      <TotalScore dice={dice} heldDice={heldDice} />
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
        {rolling ? "En cours..." : `Il te reste ${maxRolls - rollCount} lancé(s)`}
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
