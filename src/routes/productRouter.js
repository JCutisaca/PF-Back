const { Router } = require("express");
const { postProductHandler, getProductHandler, getProductByIdHandler, deleteProductHandler, postCategoryHandler, getProductFilterHandler, updateProductHandler, getProductByNameHandler, getAllCategoriesHandler, updateCategoryNameHandler } = require("../handlers/productHandler");
const productRouter = Router()

/// middlewares token-roles
// const {verifyToken, isAdmin, isModerator} = require("../middlewares/validation")

productRouter.post("/category", postCategoryHandler)
productRouter.get("/allCategories", getAllCategoriesHandler)
productRouter.put("/updateCategory", updateCategoryNameHandler)
productRouter.post("/create", postProductHandler)

productRouter.get("/allProducts", getProductHandler)
productRouter.get("/filter", getProductFilterHandler)
productRouter.get("/name", getProductByNameHandler)
productRouter.put("/update", updateProductHandler)
productRouter.get("/:id", getProductByIdHandler)
productRouter.delete("/delete/:id", deleteProductHandler)

////
////verificando prueba middlewares roles isAdmin, isModerator rutad delete solo elimina si es admin o moderatorcon solo descomentar
////la siguiente linea y comentar la linea 16 se le aplican los middlewares para comprobar usuario por token y por rol moderator
////tmb podemos agregar midleware isAdmin para comprobar usuario por token y por rol Admin 

// productRouter.delete("/delete/:id", [verifyToken, isModerator], deleteProductHandler)

///


module.exports = productRouter