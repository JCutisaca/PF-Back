const { User, Cart } = require('../../db')

const getUser = async() => {
    const allUser = await User.findAll({include: Cart})
    return allUser
}

module.exports = {
    getUser
}