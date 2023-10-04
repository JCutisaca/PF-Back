const { Router } = require("express");
const { addItemHandler } = require("../handlers/cartHandler");
const cartRouter = Router()

cartRouter.put("/add/:idUser", addItemHandler)


module.exports = cartRouter