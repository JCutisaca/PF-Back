const { Router } = require("express");
const { postProductHandler, getProductHandler, getProductByIdHandler, deleteProductHandler, postCategoryHandler, getProductFilterHandler, updateProductHandler, getProductByNameHandler, getAllCategoriesHandler, updateCategoryNameHandler } = require("../handlers/productHandler");
const productRouter = Router()
const {verifyToken, isAdmin, isModerator} = require("../middlewares/validation")

productRouter.post("/category", postCategoryHandler)
productRouter.get("/allCategories", getAllCategoriesHandler)
productRouter.put("/updateCategory", updateCategoryNameHandler)
productRouter.post("/create", postProductHandler)

productRouter.get("/allProducts", getProductHandler)
productRouter.get("/filter", getProductFilterHandler)
productRouter.get("/name", getProductByNameHandler)
productRouter.put("/update", updateProductHandler)
productRouter.get("/:id", getProductByIdHandler)


////verificando prueba middlewares roles isAdmin, isModerator rutad delete solo elimina si es admin o moderator
// productRouter.delete("/delete/:id", deleteProductHandler)

productRouter.delete("/delete/:id", [verifyToken, isModerator], deleteProductHandler)

///


module.exports = productRouter