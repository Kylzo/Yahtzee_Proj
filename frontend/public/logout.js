// Ajouter un écouteur d'événements pour gérer la déconnexion lorsque le bouton est cliqué
document.getElementById("logoutBtn").addEventListener("click", () => {
  // Supprimer le jeton JWT du stockage local
  localStorage.removeItem("jwt");

  // Rediriger l'utilisateur vers la page de connexion
  window.location.href = "/connexion";
});
