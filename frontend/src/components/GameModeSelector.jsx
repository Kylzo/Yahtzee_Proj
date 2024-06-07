import React, { useState } from "react";
import RollDice from "./RollDice";
import RollDiceMulti from "./RollDiceMulti";
import "../styles/GameModeSelector.css";

const GameModeSelector = () => {
  const [mode, setMode] = useState(null);

  return (
    <div className="game-mode-selector">
      {mode === null && (
        <div className="mode-selection">
          <button onClick={() => setMode("solo")}>Jeu Solo</button>
          <button onClick={() => setMode("multi")}>Jeu Multijoueur</button>
        </div>
      )}
      {mode === "solo" && <RollDice />}
      {mode === "multi" && <RollDiceMulti />}
    </div>
  );
};

export default GameModeSelector;
