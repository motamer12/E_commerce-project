import Joi from "joi";
import mongoose from "mongoose";

const objectIdSchema = Joi.string()
  .custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error("any.invalid");
    }
    return value;
  }, "MongoDB ObjectId validation")
  .message("Invalid Product ID");

const wishListSchema = Joi.array().items(objectIdSchema);

export default wishListSchema;
