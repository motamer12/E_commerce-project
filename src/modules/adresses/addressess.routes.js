import { Router } from "express";
import authController from "../auth/auth.controller.js";
import addressController from './adressess.controller.js';
import { allowedTo } from "../../middlewares/allowedTo.js";
import { validate } from "../../middlewares/validate.js";
import schema from "./address.validate.js";

export const addressesRouter = Router();

addressesRouter.use(authController.protectedRoute);

addressesRouter.patch('/', allowedTo('user', 'admin'),validate(schema), addressController.addAddress);

addressesRouter.delete('/', allowedTo('user', 'admin'), addressController.removeFromeAddresses);