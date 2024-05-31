import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import { useAuth } from "../context/AuthContext.js";
import Cookies from "js-cookie";

const Connexion = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const toggle = () => {
    setOpen(!open);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await res.json();

      setLoading(false);

      if (res.ok) {
        setIsAuthenticated(true);
        const { token } = data;
        Cookies.set("jwt-token", token, {
          expires: 1,
          secure: true,
          sameSite: "Strict",
        });
        navigate("/");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setLoading(false);
      setError(
        "Une erreur est survenue lors de la connexion. Veuillez réessayer."
      );
    }
  };

  return (
    <main className="auth">
      <h1>Connectez-vous à Yahtzee</h1>
      <form onSubmit={handleSubmit}>
        <div className="label">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="text" onChange={handleChange} />
        </div>
        <div className="label">
          <label htmlFor="password">Mot de passe</label>
          <div className="eye-password">
            <input
              id="password"
              name="password"
              type={open === false ? "password" : "text"}
              onChange={handleChange}
            />
            <div className="hide-password">
              {open === false ? (
                <i className="fa-solid fa-eye" onClick={toggle}></i>
              ) : (
                <i className="fa-solid fa-eye-slash" onClick={toggle}></i>
              )}
            </div>
          </div>
        </div>
        <button className="button" type="submit" disabled={loading}>
          {loading ? "Chargement..." : "Se connecter"}
        </button>
      </form>
      <p className="account-message">
        Vous ne possédez pas de compte ?{" "}
        <Link to="/inscription" className="link">
          Inscription
        </Link>
      </p>
      {error && <p className="error-message">{error}</p>}
    </main>
  );
};

export default Connexion;
