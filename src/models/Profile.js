const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('Profile', {
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
        nickname: {
            type: DataTypes.STRING,
        },
        userphoto:{
            type: DataTypes.STRING,
            allownull: false,
            default: null
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
        address: {
            type: DataTypes.STRING,
            allownull: true
        },

    }, {
        timestamps: false
    })
}