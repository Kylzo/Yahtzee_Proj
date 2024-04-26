import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Regles from "./pages/Regles.jsx";
import Connexion from "./pages/Connexion.jsx";
import Inscription from "./pages/Inscription.jsx";
import Navbar from "./components/Navbar.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/rules" element={<Regles />} />
        <Route exact path="/connexion" element={<Connexion />} />
        <Route exact path="/inscription" element={<Inscription />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
