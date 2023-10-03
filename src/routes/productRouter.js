const { Router } = require("express");
const { postProductHandler, getProductHandler, getProductByIdHandler, deleteProductHandler, postCategoryHandler, getProductFilterHandler, updateProductHandler, getProductByNameHandler, getAllCategoriesHandler, updateCategoryNameHandler } = require("../handlers/productHandler");
const productRouter = Router()
const {verifyToken, isAdmin, isModerator} = require("../middlewares/validation")

productRouter.post("/category", postCategoryHandler)
productRouter.get("/allCategories", getAllCategoriesHandler)
productRouter.put("/updateCategory", updateCategoryNameHandler)

productRouter.post("/create", postProductHandler)

// productRouter.post("/create", [verifyToken, isAdmin, isModerator], postProductHandler)

productRouter.get("/allProducts", getProductHandler)
productRouter.get("/filter", getProductFilterHandler)
productRouter.get("/name", getProductByNameHandler)
productRouter.put("/update", updateProductHandler)
productRouter.get("/:id", getProductByIdHandler)
// productRouter.delete("/delete/:id", deleteProductHandler)

productRouter.delete("/delete/:id", [verifyToken, isAdmin ], deleteProductHandler)


module.exports = productRouter