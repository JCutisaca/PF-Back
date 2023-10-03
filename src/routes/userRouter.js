const { Router } = require("express");
const { postUserHandler, getUserHandler, getUserByIDHandler, deleteUserHandler, updateUserHandler, loginUserHandler } = require("../handlers/userHandler");
const userRouter = Router()
const {verifyToken, isAdmin, isModerator} = require("../middlewares/validation")

userRouter.post("/login", loginUserHandler)

////verificando prueba middlewares role isAdmin, isModerator 
// userRouter.post("/create", postUserHandler)
userRouter.post("/create", [verifyToken, isAdmin], postUserHandler)
///


userRouter.get("/allUsers", getUserHandler)
userRouter.put("/update", updateUserHandler)
userRouter.get("/:id", getUserByIDHandler)
userRouter.delete("/delete/:id", deleteUserHandler)


module.exports = userRouter