import "../styles/Dice.css";
import PropTypes from "prop-types"; // Pour la validation des types

const Dice = ({ face, rolling, onClick, held }) => {
  return (
    <i
      className={`dice fa-solid fa-dice-${face} ${
        held ? "held" : rolling ? "shaking" : ""
      }`}
      onClick={onClick}
    ></i>
  );
};

// Définir les types attendus pour les props
Dice.propTypes = {
  face: PropTypes.string.isRequired, // Nom de la face du dé (ex. "one", "two")
  rolling: PropTypes.bool, // Indique si le dé est en cours de roulement
  onClick: PropTypes.func, // Fonction à appeler lors d'un clic (facultatif)
  held: PropTypes.bool, // Indique si le dé est retenu
};

// Valeurs par défaut pour les props facultatives
Dice.defaultProps = {
  rolling: false,
  held: false,
};

export default Dice;
