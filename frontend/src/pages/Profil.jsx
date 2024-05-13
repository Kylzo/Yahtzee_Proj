import { useState } from "react";
import "../styles/Profil.css";

const Profil = () => {
  const [popupDelete, setPopupDelete] = useState(false);

  const toggle = () => {
    setPopupDelete(!popupDelete);
  };

  return (
    <main className="profil">
      <h1>Profil</h1>
      <form>
        <div className="label">
          <label htmlFor="pseudo">Pseudo</label>
          <input id="pseudo" name="pseudo" type="text" />
        </div>
        <div className="label">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="text" />
        </div>
        <div className="label">
          <label htmlFor="password">Mot de passe</label>
          <input id="password" name="password" type="text" />
        </div>
        <button className="button">{"Mettre à jour"}</button>
      </form>
      <button onClick={toggle} className="delete-btn">
        Supprimer mon compte
      </button>
      {popupDelete && (
        <div className="container-modale">
          <div className="modale-delete-account">
            <p className="title-delete">
              Êtes vous sûr de vouloir supprimer votre compte ?
            </p>
            <div className="container-btn">
              <button>Oui, je suis sûr</button>
              <button onClick={toggle}>Non, annuler</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Profil;
