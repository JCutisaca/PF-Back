const { Router } = require("express");
const { postUserHandler, getUserHandler, getUserByIDHandler, deleteUserHandler, updateUserHandler, loginUserHandler } = require("../handlers/userHandler");
const userRouter = Router()

/// middlewares token-roles
/// const {verifyToken, isAdmin, isModerator} = require("../middlewares/validation")


////
////verificando prueba middlewares roles isAdmin, isModerator rutad delete solo elimina si es admin o moderatorcon solo descomentar
////la siguiente linea y comentar la linea 19 se le aplican los middlewares para comprobar usuario por token y por rol Admin
////tmb podemos agregar midleware isModerator para comprobar usuario por token y por rol Moderator 

// userRouter.post("/create", [verifyToken, isAdmin], postUserHandler)

///

userRouter.post("/login", loginUserHandler)
userRouter.post("/create", postUserHandler)
userRouter.get("/allUsers", getUserHandler)
userRouter.put("/update", updateUserHandler)
userRouter.get("/:id", getUserByIDHandler)
userRouter.delete("/delete/:id", deleteUserHandler)


module.exports = userRouter