import jwt from "jsonwebtoken";

const jwtMiddleware = (req, res, next) => {
  // Récupérer le jeton JWT à partir du cookie ou du header Authorization
  const token =
    req.cookies["jwt-token"] || req.headers.authorization?.split(" ")[1];

  // Vérifier si le jeton JWT existe
  if (!token) {
    return res
      .status(401)
      .json({ message: "Accès non autorisé - Jeton JWT manquant" });
  }

  try {
    // Vérifier la validité du jeton JWT en utilisant la clé secrète stockée dans les variables d'environnement
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    // Ajouter les informations utilisateur décryptées à la requête
    req.playerId = decodedToken.playerId;

    // Passer à l'étape suivante
    next();
  } catch (error) {
    // En cas d'erreur de vérification du jeton JWT
    return res
      .status(401)
      .json({ message: "Accès non autorisé - Jeton JWT invalide" });
  }
};

export default jwtMiddleware;
