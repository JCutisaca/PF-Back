const { User, Role } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["token"];
    // console.log(token);

    if (!token) return res.status(400).json({ message: "no token provided" });

    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    // console.log(decoded);

    const user = await User.findOne({ where: { id: req.userId } });
    if (!user) return res.status(404).json({ message: "user not found" });
    // console.log(user);

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Aquí necesitas utilizar "findAll" en lugar de "findAl"
    const roles = await Role.findAll({ where: { name: user.typeUser } });
    console.log(roles);
    if (!roles || roles.length === 0) {
      return res
        .status(403)
        .json({ message: "User does not have the required role" });
    }

    // roles es un array de roles que coincide con el tipo de usuario del usuario
    // Puedes hacer lo que necesites con los roles aquí, por ejemplo, verificar si contiene el rol de "Admin"
    const isAdmin = roles.some((role) => role.name === "Admin");

    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "User does not have admin privileges" });
    }

    // Si llegas aquí, el usuario tiene el rol de "Admin" y puedes continuar con el siguiente middleware
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const isModerator = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.userId } });
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        // Aquí necesitas utilizar "findAll" en lugar de "findAl"
        const roles = await Role.findAll({ where: { name: user.typeUser } });
        console.log(roles);
        if (!roles || roles.length === 0) {
          return res
            .status(403)
            .json({ message: "User does not have the required role" });
        }
    
        // roles es un array de roles que coincide con el tipo de usuario del usuario
        // Puedes hacer lo que necesites con los roles aquí, por ejemplo, verificar si contiene el rol de "Admin"
        const isModerator = roles.some((role) => role.name === "Moderator");
    
        if (!isModerator) {
          return res
            .status(403)
            .json({ message: "User does not have Moderator privileges" });
        }
    
        // Si llegas aquí, el usuario tiene el rol de "Admin" y puedes continuar con el siguiente middleware
        next();
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
};

module.exports = {
  verifyToken,
  isAdmin,
  isModerator
};
