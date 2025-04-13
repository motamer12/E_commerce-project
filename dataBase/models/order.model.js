import { model, Schema } from "mongoose";


const orderSchema =new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    orderItem:[
        {
            product:{
                type:Schema.Types.ObjectId,
                ref:"User"
            },
            quantity:Number,
            price:{
                type:Number
            }
        }
    ],
    totalOrderPrice:{
        type:Number,
        default:0
    },
    shippingAddress:{
        street:String,
        city:String,
        phone:String
    },
    paymentMethod:{
        type:String,
        enum:["cash","card"],
        default:"cash"
    },
    isPaid:{
        type:Boolean,
        default:false
    },
    paidAt:Date,
    isDeliverd:{
        type:Boolean,
        default:false
    },
    
    deliverdAt:Date
    
},{
    timestamps:true,
    versionKey:false
})


export const Order =model("Order",orderSchema)