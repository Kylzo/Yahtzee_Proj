import { Link } from "react-router-dom";
import "../styles/Auth.css";

const Inscription = () => {
  return (
    <main className="auth">
      <h1>Inscrivez vous à Yahtzee</h1>
      <form>
        <div className="label">
          <label htmlFor="name">Pseudo</label>
          <input id="name" name="pseudo" type="text" />
        </div>
        <div className="label">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="text" />
        </div>
        <div className="label">
          <label htmlFor="password">Mot de passe</label>
          <input id="password" name="password" type="text" />
        </div>
        <button className="button">S'incrire</button>
      </form>
      <p>
        Vous possédez déjà un compte ?{" "}
        <Link to="/connexion" className="link">
          Connexion
        </Link>
      </p>
    </main>
  );
};

export default Inscription;
