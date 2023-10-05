const { Router } = require("express");
const userRouter = require("./userRouter");
const productRouter = require("./productRouter");
const { UUIDV1 } = require("sequelize");
const cartRouter = require("./cartRouter");
const profileRouter = require("./profileRouter");

const router = Router();

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/cart", cartRouter);
router.use("/profile", profileRouter);

module.exports = router;
