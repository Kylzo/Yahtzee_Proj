import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profil.css";
import { useAuth } from "../context/AuthContext.js";

const Profil = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popupDelete, setPopupDelete] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(false);

      const res = await fetch(
        `http://localhost:3000/api/player?id_player=${user.id_player}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (data.success === false) {
        setError(true);
        return;
      }

      const response = await fetch("http://localhost:3000/api/current-user", {
        method: "GET",
        credentials: "include",
      });
      const userData = await response.json();

      setUser(userData);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  const toggle = () => {
    setPopupDelete(!popupDelete);
  };

  const handleLogOut = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/logout", {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        setIsAuthenticated(false);
        navigate("/connexion");
      } else {
        console.error("Échec de la déconnexion");
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/player?id_player=${user.id_player}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await res.json();

      if (data.success === false) {
        setError(true);
        return;
      }

      await handleLogOut();
    } catch (error) {
      console.error("Erreur lors de la suppression du compte :", error);
      setError(true);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/current-user", {
          method: "GET",
          credentials: "include",
        });
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations de l'utilisateur :",
          error
        );
      }
    };

    fetchUser();
  }, []);

  return (
    <main className="profil">
      {user && (
        <>
          <h1>Profil de {user.pseudo}</h1>
          <form onSubmit={handleSubmit}>
            <div className="label">
              <label htmlFor="pseudo">Pseudo</label>
              <input
                id="pseudo"
                name="pseudo"
                type="text"
                defaultValue={user.pseudo}
                onChange={handleChange}
              />
            </div>
            <div className="label">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="text"
                defaultValue={user.email}
                onChange={handleChange}
              />
            </div>
            <div className="label">
              <label htmlFor="password">Mot de passe</label>
              <input
                id="password"
                name="password"
                type="text"
                onChange={handleChange}
              />
            </div>
            <button className="button">
              {loading ? "Chargement..." : "Mettre à jour"}
            </button>
          </form>
          <button onClick={toggle} className="delete-btn">
            Supprimer mon compte
          </button>
          <p className="error-message">{error && "Une erreur est survenue"}</p>
          {popupDelete && (
            <div className="container-modale">
              <div className="modale-delete-account">
                <p className="title-delete">
                  Êtes-vous sûr de vouloir supprimer votre compte ?
                </p>
                <div className="container-btn">
                  <label htmlFor="confirm-password">
                    Confirmez votre mot de passe :
                  </label>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    onChange={handlePasswordChange}
                  />
                  <button onClick={handleDelete}>Oui, je suis sûr</button>
                  <button onClick={toggle}>Non, annuler</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default Profil;
