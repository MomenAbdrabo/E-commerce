import { couponModel } from "../../../../DB/models/coupon.model.js"
import Cloudinary from "../../../utlis/Cloudinary.js"


export const createCoupon=async(req,res,next)=>{
    const{code}=req.body
    
    if(await couponModel.findOne({code})){
        return next(new Error(`can't doublicate code `),{cause:409})
    }
 
    if(req.file){
        const {public_id,secure_url}= await Cloudinary.uploader.upload(req.file.path,{folder:`/coupon/code`})
        req.body.image={public_id,secure_url}
    }
    req.body.expireDate=new Date(req.body.expireDate)
    req.body.createdBy=req.user._id
    const coupon= await couponModel.create(req.body)

    res.status(200).json({message:'add coupon', coupon})
}


//=================== update ===============/
export const updateCoupon=async(req,res,next)=>{

    const coupon = await couponModel.findById(req.params.couponId)

    if(req.body.code){
    if( coupon.code===req.body.code){
        return next(new Error(`that code same old code`),{cause:404})
    }
    if(await couponModel.findOne({code:req.body.code})){
        return next(new Error(`code must be uniq`),{cause:404}) 
    }
    coupon.code=req.body.code
    
}
    if(req.file){
        const {public_id,secure_url}= await Cloudinary.uploader.upload(req.file.path,{folder:`/coupon/code`})
        if(coupon.image){
            await Cloudinary.uploader.destroy(coupon.image.public_id)
        }
        req.body.image={public_id,secure_url}
    }
    if(req.body.expireDate){
        coupon.expireDate=new Date(req.body.expireDate)
    }
    
    if(req.body.disCount){
        coupon.disCount=req.body.disCount
    }
    await coupon.save()
    res.status(201).json({message:'update done', coupon})
}