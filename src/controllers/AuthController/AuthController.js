const { User, Role } = require('../../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const singUp = async (req, res) => {
  const { name, surname, email, phone, password, address, typeUser } = req.body;

  let userRole;

  if (!(name && surname && email && password)) {
    return res.status(400).json({ error: "Required data is missing. Please provide name, surname, email, and password." });
  }

  try {
if(typeUser){
    switch (typeUser) {
        case "Admin":
        case "Moderator":
        case "User":
            break;
        default:
            throw new Error("typeUser debe ser 'Admin', 'Moderator' o 'User'");
    }
}else{
    
    if (typeUser) {
      // Buscar el rol en base al nombre proporcionado en typeUser
      const foundRole = await Role.findOne({ where: { name: typeUser } });
      if (!foundRole) {
        return res.status(400).json({ error: "Invalid role specified." });
      }
      userRole = foundRole.name;
    } else {
      // Si no se proporciona typeUser, asignar un valor predeterminado (por ejemplo, 'User')
      const defaultRole = await Role.findOne({ where: { name: "User" } });
      if (!defaultRole) {
        return res.status(500).json({ error: "Default role not found." });
      }
      userRole = defaultRole.name;
    }
}
    
if (typeUser) {
    // Buscar el rol en base al nombre proporcionado en typeUser
    const foundRole = await Role.findOne({ where: { name: typeUser } });
    if (!foundRole) {
      return res.status(400).json({ error: "Invalid role specified." });
    }
    userRole = foundRole.name;
  } else {
    // Si no se proporciona typeUser, asignar un valor predeterminado (por ejemplo, 'User')
    const defaultRole = await Role.findOne({ where: { name: "User" } });
    if (!defaultRole) {
      return res.status(500).json({ error: "Default role not found." });
    }
    userRole = defaultRole.name;
  }


    const hashedPassword = await bcrypt.hash(password, 10);

    const [user, created] = await User.findOrCreate({
      where: {
        name: name,
        surname: surname,
        email: email,
      },
      defaults: {
        phone: phone ? phone : null,
        password: hashedPassword,
        typeUser:  userRole, // Asignar el ID del rol al usuario
        address: address ? address : null,
      },
    });

    if (!created) {
      return res.status(400).json({ error: "User with the provided information already exists." });
    }

    const { id } = user.dataValues;
    const token = jwt.sign({ id }, JWT_SECRET, {
      expiresIn: 86400, // 24 horas en segundos
    });

    console.log(user);
    return res.json({ message: `User Created: ${user.name}`, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const singIn = async (req, res) => {
    const { email, password } = req.body;

    // Verificar si el correo electrónico está presente en la base de datos
    const userFound = await User.findOne({
        where: {
            email: email
        }
    });

    if (!userFound) {
        return res.status(400).json({ message: "User not found" });
    }

    // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
    const matchPassword = await bcrypt.compare(password, userFound.password);

    if (!matchPassword) {
        return res.status(401).json({ token: null, message: "Invalid password" });
    }

    const token = jwt.sign({ id: userFound.id }, JWT_SECRET, {
        expiresIn: 86400, // 24 horas en segundos
      });
    console.log(userFound);
    res.json({ token }); // Aquí debes generar y enviar el token adecuado
};






 module.exports = {
    singUp,
    singIn
 }