require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require('fs');
const path = require('path');
const { DB_DEPLOY } = process.env;

const sequelize = new Sequelize(DB_DEPLOY, {
    logging: false,
    native: false,
});
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, '/models', file)));
    });


modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { User, Product, Category } = sequelize.models;

Product.belongsTo(Category);
Category.hasMany(Product);

//relacion roles users
User.belongsToMany(Role, { through: 'UsuariosRoles' });
Role.belongsToMany(User, { through: 'UsuariosRoles' });

// Relaciones con el carrito y el usuario:
Cart.belongsTo(User)
User.hasOne(Cart)

// relaciones carrito con producto:

Cart.belongsToMany(Product, {through: "CartItem"})
Product.belongsToMany(Cart, {through: "CartItem"})


module.exports = {
    ...sequelize.models,
    conn: sequelize,
};