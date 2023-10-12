const { User, Product } = require('../../db')

const getUserByID = async({id}) => {
    if(!id) throw Error("Please provide a valid ID.")
    const userById = await User.findByPk(id, {include: [
        {
          model: Product,
          as: 'FavoriteProducts',
        },
      ]})
    return userById
}

module.exports = getUserByID;