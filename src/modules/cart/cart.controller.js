import { Cart } from "../../../dataBase/models/cart.model.js";
import HttpStatusText from '../../../utils/HttpStatusText.js';
import asyncErrorHandler from '../../middlewares/asyncErrorHandler.js';
import AppError from '../../../utils/AppError.js';
import { Product } from "../../../dataBase/models/product.model.js";
import { Coupon } from "../../../dataBase/models/coupon.model.js";


function calcTotalPrice(isCartExist){
    isCartExist.totalPrice=isCartExist.cartItems.reduce((prev,item)=>{
        return prev + item.price * item.quantity
    },0)
}

const addCart = asyncErrorHandler(
    async (req, res, next) => {

        const isCartExist = await Cart.findOne({user: req.user._id});

        let product=await Product.findById(req.body.product)
    
        if (!isCartExist) {
            const cart = new Cart({
                user: req.user._id,
                cartItems: [req.body]
            });
            calcTotalPrice(cart)
            await cart.save();
            return res.status(201).json({
                status: HttpStatusText.SUCCESS,
                data: {cart}
            });
        }else{
            let item=isCartExist.cartItems.find((item)=>item.product==req.body.product)
            if(item){
                item.quantity+=req.body.quantity
                if(item.quantity>product.stock){
                    const error = AppError.create('this product is out of stock', 400, HttpStatusText.FAIL);
                    return next(error);
                }
            }
            if(!item){
                isCartExist.cartItems.push(req.body)
            }
            calcTotalPrice(isCartExist)
            isCartExist.save()
            return res.status(201).json({status: HttpStatusText.SUCCESS,data:{isCartExist}});
            
        }

    }
);


const updateQuantity=asyncErrorHandler(async(req,res,next)=>{
    let cart =await Cart.findOne({user:req.user._id})

    let item=cart.cartItems.find((item)=>item._id==req.body.product)
    if(!item){
        const error = AppError.create('Item is not found', 400, HttpStatusText.FAIL);
        return next(error);
    }
    item.quantity = req.body.quantity
    calcTotalPrice(cart)
    await cart.save()
    return res.status(201).json({status: HttpStatusText.SUCCESS,data:{cart}});
})


const removeProductFromCart=asyncErrorHandler(async(req,res,next)=>{

    let cart =await Cart.findOneAndUpdate({user:req.user._id},
        {$pull:{cartItems:{product:req.body.product}}},{new:true})

        if(!cart){
            const error = AppError.create('there is no product to be deleted', 400, HttpStatusText.FAIL);
            return next(error);
        }

        calcTotalPrice(cart)
        await cart.save()
        return res.status(201).json({status: HttpStatusText.SUCCESS,data:{cart}});
})


const applyCoupon=asyncErrorHandler(async(req,res,next)=>{
    let coupon =await Coupon.findOne({code:req.body.code,expire:{$gt:Date.now()}})
    if(!coupon){
        const error = AppError.create('Coupon Invalid ya haramy', 400, HttpStatusText.FAIL);
        return next(error);
    }
    let cart = await Cart.findOne({user:req.user._id})
    if(!cart){
        const error = AppError.create('please make a cart first', 400, HttpStatusText.FAIL);
        return next(error);
    }
    cart.totalPriceAfterDiscount=cart.totalPrice - (cart.totalPrice * coupon.discount)/100
    cart.discount=coupon.discount
    await cart.save()
    return res.status(201).json({status: HttpStatusText.SUCCESS,data:{cart}});
})


export default {
    addCart,
    updateQuantity,
    removeProductFromCart,
    applyCoupon
}