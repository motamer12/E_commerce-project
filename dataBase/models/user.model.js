import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt'; 

const userSchema = new Schema({

    name: String,
    email: String,
    password: String,

    role: {
        type: String,
        enum: ['user', 'admin', 'manager'],
        default: 'user'
    },

    isBlocked: {
        type: Boolean,
        default: false
    },
    passwordChangedAt: Date,
    wishList: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }],
    addresses: [{
        city: String,
        phone: String,
        street: String
    }]

}, {
    timestamps: true,
    versionKey: false
});


userSchema.pre('save', function() {
    this.password = bcrypt.hashSync(this.password, 8);
});

userSchema.pre('findOneAndUpdate', function() {
    if (this._update.password) this._update.password = bcrypt.hashSync(this._update.password, 8);
});


export const User = model('User', userSchema);