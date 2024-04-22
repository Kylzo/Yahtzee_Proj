import RollDice from "../components/RollDice";
import "../styles/Home.css";

const Home = () => {
  return (
    <main className="home">
      {/* Button paramètres */}
      <div className="action-btn">
        <button className="parametres">
          <i className="fa-solid fa-gear"></i>
        </button>
      </div>

      {/* Les dés + le boutton pour lancer les dés */}
      <div>
        <RollDice />
      </div>

      {/* Feuilles des scores */}
      <div></div>
    </main>
  );
};

export default Home;
