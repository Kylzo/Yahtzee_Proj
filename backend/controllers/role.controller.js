import sql from "better-sqlite3";

const db = sql("yahtzee.db");

export const createRole = (req, res) => {
  try {
    const { role } = req.body;
    const result = db.prepare("INSERT INTO Role (role) VALUES (?)").run(role);
    res.status(201).json({ id: result.lastInsertRowid, role });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur s'est produite lors de la création du rôle.",
    });
  }
};

export const getAllRoles = (req, res) => {
  try {
    const roles = db.prepare("SELECT * FROM Role").all();
    res.json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur s'est produite lors de la récupération des rôles.",
    });
  }
};

export const getRoleById = (req, res) => {
  try {
    const { id } = req.params;
    const role = db.prepare("SELECT * FROM Role WHERE id_role = ?").get(id);
    if (!role) {
      return res
        .status(404)
        .json({ message: "Le rôle spécifié n'a pas été trouvé." });
    }
    res.json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur s'est produite lors de la récupération du rôle.",
    });
  }
};

export const updateRole = (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const result = db
      .prepare("UPDATE Role SET role = ? WHERE id_role = ?")
      .run(role, id);
    if (result.changes === 0) {
      return res
        .status(404)
        .json({ message: "Le rôle spécifié n'a pas été trouvé." });
    }
    res.json({ id, role });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur s'est produite lors de la mise à jour du rôle.",
    });
  }
};

export const deleteRoleById = (req, res) => {
  try {
    const { id } = req.params;
    const result = db.prepare("DELETE FROM Role WHERE id_role = ?").run(id);
    if (result.changes === 0) {
      return res
        .status(404)
        .json({ message: "Le rôle spécifié n'a pas été trouvé." });
    }
    res.json({ message: "Le rôle a été supprimé avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur s'est produite lors de la suppression du rôle.",
    });
  }
};
