import sql from "better-sqlite3";
const db = sql("yahtzee.db");

const Role = {
  create: (role) => {
    return db.prepare("INSERT INTO Role (role) VALUES (?)").run(role);
  },

  getAll: () => {
    return db.prepare("SELECT * FROM Role").all();
  },

  getById: (id) => {
    return db.prepare("SELECT * FROM Role WHERE id_role = ?").get(id);
  },

  update: (id, role) => {
    return db
      .prepare("UPDATE Role SET role = ? WHERE id_role = ?")
      .run(role, id);
  },

  deleteById: (id) => {
    return db.prepare("DELETE FROM Role WHERE id_role = ?").run(id);
  },
};

export default Role;
