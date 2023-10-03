
const { Role } = require("../db");

const createRoles = async () => {
  try {
    const rolesToCreate = ["Admin", "User", "Moderator"];
    const createdRoles = [];

    for (const roleName of rolesToCreate) {
      const existingRole = await Role.findOne({ where: { name: roleName } });

      if (!existingRole) {
        const newRole = await Role.create({ name: roleName });
        createdRoles.push(newRole);
        console.log(`Rol "${roleName}" creado.`);
      } else {
        console.log(`El rol "${roleName}" ya existe en la base de datos.`);
        createdRoles.push(existingRole);
      }
    }

    console.log("Roles creados o recuperados:", createdRoles);
  } catch (error) {
    console.log("Error al crear/obtener roles:", error);
  }
};

module.exports = createRoles;


