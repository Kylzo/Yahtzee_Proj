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
    const sortedValues = dice.map((die) => Object.values(die)[0]).sort((a, b) => a - b);
    const largeStraightCombinations = [[1, 2, 3, 4, 5], [2, 3, 4, 5, 6]];
    const smallStraightCombinations = [[1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6]];
    const isLargeStraight = largeStraightCombinations.some(combination =>
      combination.every(value => sortedValues.includes(value))
    );
    const isSmallStraight = smallStraightCombinations.some(combination =>
      combination.every(value => sortedValues.includes(value))
    );

    if (isLargeStraight) {
      return 40;
    } else if (isSmallStraight) {
      return 30;
    }

    const values = dice.map((die) => Object.values(die)[0]);
    const isYahtzee = values.every((value, index, arr) => value === arr[0]);

    if (isYahtzee) {
      return 50;
    }

    const fullHouseValues = [...new Set(values)];
    let isFullHouse = false;

    if (fullHouseValues.length === 2) {
      const counts = fullHouseValues.map(value =>
        values.filter(dieValue => dieValue === value).length
      );
      if (counts.includes(2) && counts.includes(3)) {
        isFullHouse = true;
      }
    }
    if (isFullHouse) {
      return 25;
    }

    const counts = {};

    values.forEach(value => {
      counts[value] = (counts[value] || 0) + 1;
    });

    const isFourOfAKind = Object.values(counts).some(count => count >= 4);

    if (isFourOfAKind) {
      const carreValues = values.filter(value => counts[value] >= 4);
      return carreValues.reduce((sum, value) => sum + value, 0);
    }

    const isThreeOfAKind = Object.values(counts).some(count => count >= 3);

    if (isThreeOfAKind) {
      const brelanValues = values.filter(value => counts[value] >= 3);
      return brelanValues.reduce((sum, value) => sum + value, 0);
    } else {
      return 0;
    }
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
