import sql from "better-sqlite3";
import crypto from "crypto";

const db = sql("yahtzee.db");

const hashPassword = (password) => {
  return crypto.createHash("sha256").update(password).digest("hex");
};

const Player = {
  getAll: () => {
    return db.prepare("SELECT * FROM Player").all();
  },

  getById: (id) => {
    return db.prepare("SELECT * FROM Player WHERE id_player = ?").get(id);
  },

  create: (pseudo, email, password, avatar = null) => {
    const hashedPassword = hashPassword(password);
    const defaultRoleId = 2;
    return db
      .prepare(
        `
      INSERT INTO Player (pseudo, email, password, id_role, avatar)
      VALUES (?, ?, ?, ?, ?)
      `
      )
      .run(pseudo, email, hashedPassword, defaultRoleId, avatar);
  },

  update: (id, player) => {
    const sqlData = [];
    const runData = [];

    if (player.pseudo) {
      sqlData.push("pseudo = ?");
      runData.push(player.pseudo);
    }

    if (player.email) {
      sqlData.push("email = ?");
      runData.push(player.email);
    }

    if (player.password) {
      const hashedPassword = hashPassword(player.password);
      sqlData.push("password = ?");
      runData.push(hashedPassword);
    }

    runData.push(id);

    let sqlTxt =
      "UPDATE Player SET " + sqlData.join(", ") + " WHERE id_player = ?";

    return db.prepare(sqlTxt).run(...runData);
  },

  setDefaultRole: (roleId) => {
    const defaultRoleId = 2;
    return db
      .prepare(
        `
      UPDATE Player 
      SET id_role = ?
      WHERE id_role = ?
      `
      )
      .run(roleId, defaultRoleId);
  },

  deleteById: (id) => {
    return db.prepare("DELETE FROM Player WHERE id_player = ?").run(id);
  },
};

export default Player;
