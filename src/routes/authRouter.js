const { Router } = require("express");
const  {singIn, singUp}  = require("../controllers/AuthController/AuthController");
const authRouter = Router()



authRouter.post("/singin", singIn)
authRouter.post("/singup", singUp)



module.exports = authRouter