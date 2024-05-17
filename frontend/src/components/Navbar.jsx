import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Y.png";
import "../styles/Navbar.css";
import { useAuth } from "../context/AuthContext.js";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const popupRef = useRef();
  const title = "ahtzee";
  const home = "Accueil";
  const regles = "Règles";
  const login = "Connexion";
  const register = "Inscription";
  const profile = "Profil";
  const deco = "Déconnexion";
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const popup = () => {
    setOpen(!open);
  };

  const handleOutsideClick = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, true);
    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, []);

  const handleLogOut = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/logout", {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        setIsAuthenticated(false); // Mettez à jour l'état pour indiquer que l'utilisateur est déconnecté
        navigate("/connexion"); // Redirigez vers la page de connexion
      } else {
        console.error("Échec de la déconnexion");
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <div className="navigation">
      <nav>
        <div className="nav-left-part">
          <div className="logo">
            <img src={logo} alt="logo entreprise yahtzee" width={40} />
            <Link to="/" className="">
              {title}
            </Link>
          </div>
          <div className="link-items">
            <Link to="/">{home}</Link>
            <Link to="/rules">{regles}</Link>
          </div>
        </div>
        <div className="nav-right-part">
          {isAuthenticated ? (
            <>
              <Link to="/profil" className="hidden">
                {profile}
              </Link>
              <button onClick={handleLogOut} className="hidden btn-deco">
                {deco}
              </button>
            </>
          ) : (
            <>
              <Link to="/connexion" className="">
                {login}
              </Link>
              <Link to="/inscription" className="hidden">
                {register}
              </Link>
            </>
          )}
          <div className="popup show" ref={popupRef}>
            <button onClick={popup} className="btn-navigation">
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </button>
            {open && (
              <div className="mobile-popup">
                <ul className="mobile-link-items">
                  <li>
                    <Link to="/" onClick={() => setOpen(false)}>
                      {home}
                    </Link>
                  </li>
                  <li>
                    <Link to="/rules" onClick={() => setOpen(false)}>
                      {regles}
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
