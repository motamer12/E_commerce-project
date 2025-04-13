import { model, Schema } from "mongoose";


const couponSchema = new Schema({

    code: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    expire: {
        type:Date,
        default:Date.now()
    },

    discount: Number

}, {
    timestamps: true,
    versionKey: false
});

export const Coupon = model('Coupon', couponSchema);