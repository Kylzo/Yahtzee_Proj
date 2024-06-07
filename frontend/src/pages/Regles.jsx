import React from "react";
import "../styles/Regles.css";
import fiche_score from "../img/fiche_score.png";

const Regles = () => {
  return (
    <div className="rules-container">
      <h1>Déroulement d’une partie de Yahtzee</h1>
      <p>
        Après avoir déterminé le premier joueur et le sens du jeu, chaque joueur
        dispose de 3 lancers par tour pour réaliser une combinaison précise
        (voir ci-dessous).
      </p>
      <p>
        Au 1er lancer le joueur jette tous ses dés. S'il est satisfait du
        résultat, il peut s’arrêter là et noter le score de la combinaison sur
        la fiche de score, sinon il rejoue. Au 2ème et 3ème lancer, le joueur a
        le choix de relancer tous ses dés ou seulement quelques-uns pour tenter
        de réaliser une combinaison.
      </p>
      <p>
        Après ses 3 lancers de dés le joueur doit obligatoirement noter son
        résultat dans une case combinaison de la fiche de score. S'il lui est
        impossible de remplir une case, il doit alors barrer une combinaison de
        son choix et ne pourra plus la réaliser par la suite.
      </p>
      <p>
        Une partie de Yahtzee a un nombre de tours qui correspond aux
        combinaisons à réaliser sur une fiche de score ; le jeu Yahtzee se
        termine donc au 13ème tour.
      </p>
      <p>
        La partie de Yahtzee se termine quand chaque joueur a rempli sa grille
        de score. Chacun compte ses points en commençant par la section haute
        (sans oublier le bonus de 35 points s'il est validé), puis la section
        basse, et enfin en additionnant les totaux 1 et 2.
      </p>
      <p>Le gagnant est le joueur qui totalise le plus de points.</p>

      <h2>Exemple de fiche de score pour Yahtzee</h2>
      <p>Exemple d'une fiche de score au Yahtzee</p>
      <div className="image-container">
        <img
          src={fiche_score}
          alt="Fiche de score Yahtzee"
          className="score-sheet-image"
        />
      </div>
      <h2>Exemple d'un tour au Yahtzee</h2>
      <p>Lancez les cinq dés pour un premier essai.</p>
      <p>
        S’arrêter et prendre le Brelan ? Relancer deux 3 pour tenter la Suite ?
        Relancer le 2 et le 4 pour tenter le Yahtzee ? À vous de choisir, il
        vous reste deux lancers.
      </p>
      <p>Relancez deux dés. Yahtzee ! À vous le bonus.</p>

      <h2>Les combinaisons de la fiche de score du Yahtzee</h2>
      <p>
        Une feuille de score est généralement divisée en deux parties, et
        comprend les combinaisons suivantes :
      </p>

      <h3>Section haute :</h3>
      <table>
        <thead>
          <tr>
            <th>Combinaison</th>
            <th>Valeur</th>
            <th>Scores</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>dé de 1</td>
            <td>Somme des as obtenus</td>
            <td>...</td>
          </tr>
          <tr>
            <td>dé de 2</td>
            <td>Somme des deux obtenus</td>
            <td>...</td>
          </tr>
          <tr>
            <td>dé de 3</td>
            <td>Somme des trois obtenus</td>
            <td>...</td>
          </tr>
          <tr>
            <td>dé de 4</td>
            <td>Somme des quatre obtenus</td>
            <td>...</td>
          </tr>
          <tr>
            <td>dé de 5</td>
            <td>Somme des cinq obtenus</td>
            <td>...</td>
          </tr>
          <tr>
            <td>dé de 6</td>
            <td>Somme des six obtenus</td>
            <td>...</td>
          </tr>
          <tr>
            <td>Bonus de 35 points</td>
            <td>Si la somme des scores est supérieur ou égale à 63</td>
            <td>...</td>
          </tr>
        </tbody>
      </table>

      <h3>Section basse :</h3>
      <table>
        <thead>
          <tr>
            <th>Combinaison</th>
            <th>Valeur</th>
            <th>Scores</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Brelan</td>
            <td>3 dés identiques</td>
            <td>Somme des 5 dés</td>
          </tr>
          <tr>
            <td>Carré</td>
            <td>4 dés identiques</td>
            <td>Somme des 5 dés</td>
          </tr>
          <tr>
            <td>Full</td>
            <td>3 dés identiques et 2 dés identiques</td>
            <td>25 points</td>
          </tr>
          <tr>
            <td>Petite Suite</td>
            <td>4 dés qui se suivent</td>
            <td>25 points</td>
          </tr>
          <tr>
            <td>Grande Suite</td>
            <td>5 dés qui se suivent</td>
            <td>40 points</td>
          </tr>
          <tr>
            <td>YAHTZEE</td>
            <td>5 dés identiques</td>
            <td>50 points</td>
          </tr>
          <tr>
            <td>La Chance</td>
            <td>Somme des 5 dés</td>
            <td>...</td>
          </tr>
        </tbody>
      </table>

      <h2>Les bonus de points pouvant être gagnés au Yahtzee</h2>
      <p>
        Si le total de la section haute atteint ou dépasse 63 points, le joueur
        gagne un bonus de 35 points. Si un joueur réalise un second Yahtzee et
        qu’il a déjà inscrit 50 points, il rajoute un bonus de 100 points dans
        sa case et doit en contrepartie rayer une autre case libre. On applique
        également cette règle dans le cas d’un troisième Yahtzee, d’un quatrième
        Yahtzee...
      </p>

      <h2>Les stratégies pour gagner au Yahtzee</h2>
      <p>
        Le Yahtzee est jeu de hasard raisonné, il n'y a donc pas de stratégie
        infaillible mais pour optimiser ses gains il y a quelques astuces à
        connaitre, par exemple :
      </p>
      <ul>
        <li>
          Si vous avez un brelan au premier lancer de dés, essayez toujours
          d'améliorer votre combinaison en visant le carré, le full, le Yahtzee
          ou un gros score dans la section haute.
        </li>
        <li>
          Si vous n'obtenez pas la combinaison que vous visiez et que vous devez
          sacrifier une case, gardez le plus longtemps possible la chance et
          préférez sacrifier les 1 et le 2, car ils rapportent peu de points.
        </li>
        <li>
          Adaptez votre jeu à celui de vos adversaires pour voir où il est
          judicieux de chercher à faire plus et où il est possible de faire un
          faible score sans trop de risque.
        </li>
      </ul>
      <div className="creators">
        <p>
          Le jeu a été créé par Sarah Roperch, Théo Marchand et Flavien
          Torralba.
        </p>
      </div>
    </div>
  );
};

export default Regles;
