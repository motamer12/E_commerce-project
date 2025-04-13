import Joi from 'joi';

const addressSchema = Joi.object({
  city: Joi.string().required(),
  phone: Joi.string().required(),
  street: Joi.string().required(),
});

const schema = Joi.object({
  addresses: Joi.array().items(addressSchema).required(),
});

export default schema;
