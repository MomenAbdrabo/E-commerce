
import mongoose, { model ,Schema } from "mongoose";


const orderSchema=new Schema({

    
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    userName:{type:String, lowercase:true,required:true},
    address:[{type:String,required:true}],
    phone:[{type:String,required:true}],
    products:[
       {
        productId:{
            type:mongoose.Types.ObjectId,
            ref:"User",
            required:true
        },
        productName:{type:String, lowercase:true,required:true},
        quantity:{type:Number,default:1,required:true},
        size:{
            type:[String],
            enum:['S','M','L','XXL','XXXL']
        },
        color:[{type:String}],
        unitPrice:{type:Number,required:true},
        totalPrice:{type:Number,required:true}
       }
    ],
    couponId:{
        type:mongoose.Types.ObjectId,
        ref:"Coupon",
    },
    totalPrice:{
        type:Number,
        required:true,
    },
    finalPrice:{
        type:Number,
        required:true,
    },
    paymentType:{
        type:String,
        default:'cash',
        enum:['cash','card'],
        required:true,
    },
    status:{
        type:String,
        default:'placed',
        enum:['wait payment','placed','on way','cancelled','rejected','delivered']
    },
    reason:String,
    note:String,
 
},{
    timestamps:true
})

export const orderModel=mongoose.models.Order||model('Order',orderSchema)