const { User } = require('../../db')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env;


const postUser = async ({ name, image, surname, email, phone, password, address, typeUser }) => {

  if (!(name || surname || email || password)) throw Error("Required data is missing. Please provide name, surname, email, and password.")

  const hashedPassword = await bcrypt.hash(password, 10);
  const [user, created] = await User.findOrCreate({
    where: {
      name: name,
      surname: surname,
      email: email,
      phone: phone ? phone : null,
      password: hashedPassword,
      typeUser: typeUser ? typeUser : "User",
      userBan: false,
      address: address ? address : null,
      image: image ? image : null
    }
  })
  if (!created) throw Error("User with the provided information already exists.")
  const {id} = user.dataValues;
  const token = jwt.sign({id}, JWT_SECRET )
  return ({ message: `User Created: ${user.name}`, token });
}

module.exports = {
  postUser
};


