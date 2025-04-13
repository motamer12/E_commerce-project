import Joi from 'joi';
import mongoose from 'mongoose';

const objectId = Joi.string().custom((value, helpers) => {
  return mongoose.Types.ObjectId.isValid(value) ? value : helpers.error("any.invalid");
}, "ObjectId Validation");

const orderItemSchema = Joi.object({
  product: objectId.required(),
  quantity: Joi.number().integer().min(1).required(),
  price: Joi.number().min(0).required(),
});

const shippingAddressSchema = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  phone: Joi.string().required(),
});

const orderSchema = Joi.object({
  user: objectId.required(),
  orderItem: Joi.array().items(orderItemSchema).min(1).required(),
  totalOrderPrice: Joi.number().min(0).default(0),
  shippingAddress: shippingAddressSchema.required(),
  paymentMethod: Joi.string().valid("cash", "card").default("cash"),
  isPaid: Joi.boolean().default(false),
  paidAt: Joi.date().optional(),
  isDeliverd: Joi.boolean().default(false),
  deliverdAt: Joi.date().optional(),
});

export default orderSchema;
