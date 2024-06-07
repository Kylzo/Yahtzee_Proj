import Database from "better-sqlite3";
import crypto from "crypto";

const db = new Database("yahtzee.db");

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function resetDatabase() {
  // Suppression des tables existantes
  db.exec(`
      DROP TABLE IF EXISTS Chat;
      DROP TABLE IF EXISTS Score;
      DROP TABLE IF EXISTS Gaming;
      DROP TABLE IF EXISTS PlayerRole;
      DROP TABLE IF EXISTS Game;
      DROP TABLE IF EXISTS Player;
      DROP TABLE IF EXISTS Role;
    `);

  // Création des tables
  const createRoleStatement = db.prepare(`
      CREATE TABLE IF NOT EXISTS Role (
        id_role INTEGER PRIMARY KEY,
        role TEXT NOT NULL
      )
    `);
  createRoleStatement.run();

  const createPlayerStatement = db.prepare(`
      CREATE TABLE IF NOT EXISTS Player (
        id_player INTEGER PRIMARY KEY,
        avatar TEXT,
        pseudo TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        id_role INTEGER,
        FOREIGN KEY(id_role) REFERENCES Role(id_role)
      )
    `);
  createPlayerStatement.run();

  const createGameStatement = db.prepare(`
      CREATE TABLE IF NOT EXISTS Game (
        id_game INTEGER PRIMARY KEY,
        id_creator INTEGER NOT NULL,
        state TEXT NOT NULL,
        FOREIGN KEY(id_creator) REFERENCES Player(id_player)
      )
    `);
  createGameStatement.run();

  const createChatStatement = db.prepare(`
      CREATE TABLE IF NOT EXISTS Chat (
        id_message INTEGER PRIMARY KEY,
        content TEXT NOT NULL,
        date_ DATE NOT NULL,
        id_game INTEGER NOT NULL,
        id_player INTEGER NOT NULL,
        FOREIGN KEY(id_game) REFERENCES Game(id_game),
        FOREIGN KEY(id_player) REFERENCES Player(id_player)
      )
    `);
  createChatStatement.run();

  const createScoreStatement = db.prepare(`
      CREATE TABLE IF NOT EXISTS Score (
        id_score INTEGER PRIMARY KEY,
        score INTEGER,
        id_game INTEGER NOT NULL,
        id_player INTEGER NOT NULL,
        FOREIGN KEY(id_game) REFERENCES Game(id_game),
        FOREIGN KEY(id_player) REFERENCES Player(id_player)
      )
    `);
  createScoreStatement.run();

  const createGamingStatement = db.prepare(`
      CREATE TABLE IF NOT EXISTS Gaming (
        id_player INTEGER NOT NULL,
        id_game INTEGER NOT NULL,
        id_role INTEGER NOT NULL,
        PRIMARY KEY(id_player, id_game, id_role),
        FOREIGN KEY(id_player) REFERENCES Player(id_player),
        FOREIGN KEY(id_game) REFERENCES Game(id_game),
        FOREIGN KEY(id_role) REFERENCES Role(id_role)
      )
    `);
  createGamingStatement.run();

  const createPlayerRoleStatement = db.prepare(`
      CREATE TABLE IF NOT EXISTS PlayerRole (
        id_player INTEGER NOT NULL,
        id_role INTEGER NOT NULL,
        PRIMARY KEY(id_player, id_role),
        FOREIGN KEY(id_player) REFERENCES Player(id_player),
        FOREIGN KEY(id_role) REFERENCES Role(id_role)
      )
    `);
  createPlayerRoleStatement.run();

  console.log("Tables created successfully.");

  // Insertion des données fictives
  const insertRoleStatement = db.prepare(`
      INSERT INTO Role (id_role, role) VALUES
      (1, 'admin'),
      (2, 'player')
    `);
  insertRoleStatement.run();

  const insertPlayerStatement = db.prepare(`
      INSERT INTO Player (id_player, avatar, pseudo, email, password, id_role) VALUES
      (1, 'avatar1.jpg', 'pseudo1', 'email1@example.com', '${hashPassword(
        "password1"
      )}', 1),
      (2, 'avatar2.jpg', 'pseudo2', 'email2@example.com', '${hashPassword(
        "password2"
      )}', 2),
      (3, 'avatar3.jpg', 'pseudo3', 'email3@example.com', '${hashPassword(
        "password3"
      )}', 2)
    `);
  insertPlayerStatement.run();

  const insertGameStatement = db.prepare(`
      INSERT INTO Game (id_game, id_creator, state) VALUES
      (1, 1, 'ongoing'),
      (2, 2, 'finished'),
      (3, 3, 'waiting')
    `);
  insertGameStatement.run();

  const insertChatStatement = db.prepare(`
      INSERT INTO Chat (id_message, content, date_, id_game, id_player) VALUES
      (1, 'Message 1', '2024-04-01', 1, 1),
      (2, 'Message 2', '2024-04-02', 1, 2),
      (3, 'Message 3', '2024-04-03', 2, 3)
    `);
  insertChatStatement.run();

  const insertScoreStatement = db.prepare(`
      INSERT INTO Score (id_score, score, id_game, id_player) VALUES
      (1, 100, 1, 1),
      (2, 90, 1, 2),
      (3, 80, 2, 3)
    `);
  insertScoreStatement.run();

  const insertGamingStatement = db.prepare(`
      INSERT INTO Gaming (id_player, id_game, id_role) VALUES
      (1, 1, 1),
      (2, 1, 2),
      (3, 2, 2)
    `);
  insertGamingStatement.run();

  const insertPlayerRoleStatement = db.prepare(`
      INSERT INTO PlayerRole (id_player, id_role) VALUES
      (1, 1),
      (2, 2),
      (3, 2)
    `);
  insertPlayerRoleStatement.run();

  console.log("Dummy data inserted successfully.");
}

resetDatabase();
