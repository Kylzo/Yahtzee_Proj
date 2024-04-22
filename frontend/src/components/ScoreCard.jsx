const scoreCard = ({ scores, selectCategory }) => {
  return (
    <div>
      <h3>Feuille de score</h3>
      <ul>
        {Object.keys(scores).map((category) => (
          <li key={category}>
            {category}: {scores[category] === null ? "Vide" : scores[category]}
            <button
              onClick={() => selectCategory(category)}
              disabled={scores[category] !== null}
            >
              Choisir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default scoreCard;
