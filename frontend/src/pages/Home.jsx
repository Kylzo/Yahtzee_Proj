import "../styles/Home.css";

const Home = () => {
  return (
    <main className="home">
      <div className="home-group">
        <h1>Yahtzee</h1>
        <p className="home-description">
          Venez jouer au meilleur jeu de tous les temps !
          <br />
          Vous ne serez absolument pas déçu et vivrez une expérience incroyable
          !
        </p>
        <div className="home-container-button">
          <button>Jouer en multijoueur</button>
          <button>Jouer en solo</button>
        </div>
      </div>
    </main>
  );
};

export default Home;
