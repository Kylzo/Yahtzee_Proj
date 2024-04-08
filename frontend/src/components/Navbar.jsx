import { Link } from "react-router-dom";
import logo from "../assets/Y.png";
import "../styles/Navbar.css";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const popupRef = useRef();
  const title = "ahtzee";
  const jeu = "Jeu";
  const regles = "Règles";
  const login = "Connexion";
  const register = "Inscription";

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
            <Link to="/">{jeu}</Link>
            <Link to="/rules">{regles}</Link>
          </div>
        </div>
        <div className="nav-right-part">
          <Link to="/connexion" className="">
            {login}
          </Link>
          <Link to="/inscription" className="hidden">
            {register}
          </Link>
          <div className="popup" ref={popupRef}>
            <button onClick={popup} className="btn-navigation show">
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </button>
            {open && (
              <div className="mobile-popup">
                <ul className="mobile-link-items">
                  <li>
                    <Link to="/" onClick={() => setOpen(false)}>
                      {jeu}
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
