import { Router } from "express";
import authController from "../auth/auth.controller.js";
import cartController from "./cart.controller.js";
import { allowedTo } from "../../middlewares/allowedTo.js";
import { validate } from "../../middlewares/validate.js";
import orderSchema from "./cart.validate.js";


export const cartRouter = Router();

cartRouter.use(authController.protectedRoute);


cartRouter.post("/",validate(orderSchema),cartController.addCart)
cartRouter.patch("/",cartController.updateQuantity)
cartRouter.delete("/",cartController.removeProductFromCart)
cartRouter.post("/applyCoupon",allowedTo("user","admin"),cartController.applyCoupon)
