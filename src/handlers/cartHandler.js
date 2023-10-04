const { User , ShoppingCart} = require("../db")


const { addItem } = require("../controllers/CartController/addItem")

const addItemHandler = async(req, res) => {
    try {
        const {idUser} = req.params
        const respuesta = await addItem(idUser, req.body)
        
        res.status(200).json(respuesta)
        // const {idUser, idProduct } = req.params

        // const respuesta = addItem(idUser, idProduct)
        
        
    } catch (error) {
        
    }
}



module.exports = {
    addItemHandler,
}