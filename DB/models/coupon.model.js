
import mongoose, { model ,Schema, Types } from "mongoose";


const couponSchema=new Schema({

    code:{
        type:String,
        trim:true,
        unique:[true,'name must be unique'],
        minlenth:[2,'too short coupon name'],
        lowerCase:true,
        required:true
    },
    disCount:{
        type:Number,
        min:1,
        max:100
        
    },
    expireDate:{
        type:Date,
        required:true
    },
    image:{
        type:Object,
    },
    usedBy:[{
            type:Types.ObjectId,
            ref:'User'
    }]
    ,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    updatedBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:false
    }

},{
    timestamps:true
})

export const couponModel=mongoose.models.Coupon||model('Coupon',couponSchema)