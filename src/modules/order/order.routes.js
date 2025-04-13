import { Router } from "express";
import orderController from "./order.controller.js";
import authController from "../auth/auth.controller.js";
import { validate } from "../../middlewares/validate.js";
import orderSchema from "./order.validate.js";


const orderRouter=Router()
orderRouter.use(authController.protectedRoute);


orderRouter.post("/:id",validate(orderSchema),orderController.createCashOrder)
orderRouter.post("/checkout/:id",orderController.checkoutOrder)


export default orderRouter