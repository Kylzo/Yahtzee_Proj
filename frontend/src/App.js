import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.js";
import Home from "./pages/Home.jsx";
import Regles from "./pages/Regles.jsx";
import Connexion from "./pages/Connexion.jsx";
import Inscription from "./pages/Inscription.jsx";
import Navbar from "./components/Navbar.jsx";
import Profil from "./pages/Profil.jsx";
import Jeu from "./pages/Jeu.jsx";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/rules" element={<Regles />} />
          <Route exact path="/profil" element={<Profil />} />
          <Route exact path="/connexion" element={<Connexion />} />
          <Route exact path="/inscription" element={<Inscription />} />
          <Route exact path="/jeu" element={<Jeu />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
