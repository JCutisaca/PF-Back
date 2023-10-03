const { User, Role } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["token"];

    if (!token) return res.status(400).json({ message: "no token provided" });

    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;

    const user = await User.findOne({ where: { id: req.userId } });
    if (!user) return res.status(404).json({ message: "user not found" });

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

    const roles = await Role.findAll({ where: { name: user.typeUser } });

    if (!roles || roles.length === 0) {
      return res
        .status(403)
        .json({ message: "User does not have the required role" });
    }

    const isAdmin = roles.some((role) => role.name === "Admin");

    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "User does not have admin privileges" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const isModerator = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const roles = await Role.findAll({ where: { name: user.typeUser } });

    if (!roles || roles.length === 0) {
      return res
        .status(403)
        .json({ message: "User does not have the required role" });
    }

    const isModerator = roles.some((role) => role.name === "Moderator");

    if (!isModerator) {
      return res
        .status(403)
        .json({ message: "User does not have Moderator privileges" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  verifyToken,
  isAdmin,
  isModerator,
};
