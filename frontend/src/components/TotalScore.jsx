import React from "react";

const TotalScore = ({ dice, heldDice }) => {
  const calculateTotal = () => {
    let total = 0;
    dice.forEach((die, index) => {
      if (heldDice[index]) {
        total += parseInt(Object.values(die)[0]);
      }
    });
    return total;
  };

  const calculateCombinationScore = () => {
    const values = dice.map((die) => parseInt(Object.values(die)[0]));
    const sortedValues = values.slice().sort((a, b) => a - b);
    const largeStraightCombinations = [
      [1, 2, 3, 4, 5],
      [2, 3, 4, 5, 6],
    ];
    const smallStraightCombinations = [
      [1, 2, 3, 4],
      [2, 3, 4, 5],
      [3, 4, 5, 6],
    ];

    const isLargeStraight = largeStraightCombinations.some((combination) =>
      combination.every((value) => sortedValues.includes(value))
    );
    const isSmallStraight = smallStraightCombinations.some((combination) =>
      combination.every((value) => sortedValues.includes(value))
    );

    if (isLargeStraight) {
      return 40;
    } else if (isSmallStraight) {
      return 30;
    }

    const counts = values.reduce((acc, value) => {
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});

    const uniqueValues = Object.keys(counts).map(Number);
    const isYahtzee = uniqueValues.length === 1;

    if (isYahtzee) {
      return 50;
    }

    const isFullHouse =
      uniqueValues.length === 2 &&
      Object.values(counts).includes(3) &&
      Object.values(counts).includes(2);

    if (isFullHouse) {
      return 25;
    }

    const isFourOfAKind = Object.values(counts).some((count) => count >= 4);

    if (isFourOfAKind) {
      return values.reduce((sum, value) => sum + value, 0);
    }

    const isThreeOfAKind = Object.values(counts).some((count) => count >= 3);

    if (isThreeOfAKind) {
      return values.reduce((sum, value) => sum + value, 0);
    }

    return 0;
  };

  return (
    <div className="held-dice">
      <h2>Dés retenus :</h2>
      <p>Total: {calculateTotal()}</p>
      <p>Score des combinaisons: {calculateCombinationScore()}</p>
    </div>
  );
};

export default TotalScore;
