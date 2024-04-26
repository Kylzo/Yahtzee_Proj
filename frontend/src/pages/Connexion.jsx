import { Link } from "react-router-dom";
import "../styles/Auth.css";

const Connexion = () => {
  return (
    <main className="auth">
      <h1>Connectez vous à Yahtzee</h1>
      <form>
        <div className="label">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="text" />
        </div>
        <div className="label">
          <label htmlFor="password">Mot de passe</label>
          <input id="password" name="password" type="text" />
        </div>
        <button className="button">Se connecter</button>
      </form>
      <p className="account-message">
        Vous ne possédez pas de compte ?{" "}
        <Link to="/inscription" className="link">
          Inscription
        </Link>
      </p>
    </main>
  );
};

export default Connexion;
