const { Router } = require("express");
const { updateProfileHandler, getProfileHandler, deleteProfileHandler, getProfileByIDHandler  } = require("../handlers/profileHandler");
const profileRouter = Router()


profileRouter.get("/getprofiles", getProfileHandler)
profileRouter.get("/getprofile/:id", getProfileByIDHandler)
profileRouter.put("/updateprofile", updateProfileHandler)
profileRouter.delete("/deleteprofile", deleteProfileHandler)


module.exports = profileRouter