import sql from "better-sqlite3";

const db = sql("yahtzee.db");

const Player = {
  getAll: () => {
    return db.prepare("SELECT * FROM Player").all();
  },

  getById: (id) => {
    return db.prepare("SELECT * FROM Player WHERE id_player = ?").get(id);
  },

  create: (pseudo, email, password, avatar = null) => {
    const defaultRoleId = 2; // ID du rôle joueur par défaut à modifier
    return db
      .prepare(
        `
      INSERT INTO Player (pseudo, email, password, id_role, avatar)
      VALUES (?, ?, ?, ?, ?)
      `
      )
      .run(pseudo, email, password, defaultRoleId, avatar);
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
      sqlData.push("password = ?");
      runData.push(player.password);
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
