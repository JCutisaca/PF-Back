const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allownull: false,
        },
        surname: {
            type: DataTypes.STRING,
            allownull: false,
        },
        email: {
            type: DataTypes.STRING,
            allownull: false,
            unique: true
        },
        phone: {
            type: DataTypes.BIGINT,
            allownull: true
        },
        password: {
            type: DataTypes.STRING,
            allownull: false
        },
        typeUser: {
            type: DataTypes.ENUM("Admin", "Moderator", "User"),
            allownull: false
        },
        userBan: {
            type: DataTypes.BOOLEAN,
            allownull: false
        },
        address: {
            type: DataTypes.STRING,
            allownull: true
        },
    }, {
        timestamps: false
    })
}