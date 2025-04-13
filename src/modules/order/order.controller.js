import { Cart } from "../../../dataBase/models/cart.model.js";
import { Order } from "../../../dataBase/models/order.model.js";
import { Product } from "../../../dataBase/models/product.model.js";
import Stripe from "stripe";
import AppError from "../../../utils/AppError.js";
import HttpStatusText from "../../../utils/HttpStatusText.js";
import asyncErrorHandler from "../../middlewares/asyncErrorHandler.js";


const stripe =new Stripe(process.env.STRIPE_KEY)

const createCashOrder =asyncErrorHandler(async(req,res,next)=>{
    let cart =await Cart.findById(req.params.id)
    if(!cart){
        const error = AppError.create('Cart not found', 400, HttpStatusText.FAIL);
        return next(error);
    }
    let totalOrderPrice= cart.totalPriceAfterDiscount || cart.totalPrice

    let order =new Order({
        user:req.user._id,
        orderItem:cart.cartItems,
        totalOrderPrice,
        shippingAddress:req.body.shippingAddress
    })
    await order.save()

    let options =cart.cartItems.map((item)=>{
        return({
            updateOne:{
                filter:{_id:{$in:item.product}},
                update:{$inc:{sold:item.quantity,stock:-item.quantity}}
            }
        })
    })
    await Product.bulkWrite(options)

    await Cart.findByIdAndDelete(cart._id)

    return res.status(201).json({status: HttpStatusText.SUCCESS,data:{order}});

})

const checkoutOrder =asyncErrorHandler(async(req,res,next)=>{
    let cart =await Cart.findById(req.params.id)
    if(!cart){
        const error = AppError.create('Cart not found', 400, HttpStatusText.FAIL);
        return next(error);
    }
    let totalOrderPrice= cart.totalPriceAfterDiscount || cart.totalPrice

    let session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    unit_amount: totalOrderPrice*100,
                    product_data: {
                        name: req.user.name,
                    }
                },
                quantity: 1,
            }
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
        customer_email: req.user.email,
        client_reference_id: req.params.id,
})

await Cart.findByIdAndDelete(cart._id)

return res.status(201).json({status: HttpStatusText.SUCCESS,data:{session}});

})



export default {
    createCashOrder,
    checkoutOrder
}