import Joi from 'joi';
import mongoose from 'mongoose';

const objectId = Joi.string().custom((value, helpers) => {
  return mongoose.Types.ObjectId.isValid(value) ? value : helpers.error("any.invalid");
}, "ObjectId Validation");

const cartItemSchema = Joi.object({
  product: objectId.required(),
  quantity: Joi.number().integer().min(1).required(),
  price: Joi.number().min(0).required(),
});

const orderSchema = Joi.object({
  user: objectId.required(),
  cartItems: Joi.array().items(cartItemSchema).min(1).required(),
  totalPrice: Joi.number().min(0).default(0),
  discount: Joi.number().min(0).default(0),
  totalPriceAfterDiscount: Joi.number().min(0).default(0),
});

export default orderSchema;
