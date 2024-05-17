import Role from "../models/role.model.js";

export const createRole = async (req, res) => {
  try {
    const { role } = req.body;
    const newRole = await Role.create(role);
    res.status(201).json(newRole);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur s'est produite lors de la création du rôle.",
    });
  }
};

export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.getAll();
    res.json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur s'est produite lors de la récupération des rôles.",
    });
  }
};

export const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.getById(id);
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

export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const updatedRole = await Role.update(id, role);
    res.json(updatedRole);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur s'est produite lors de la mise à jour du rôle.",
    });
  }
};

export const deleteRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Role.deleteById(id);
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
