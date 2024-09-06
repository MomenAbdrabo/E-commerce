import { orderModel } from "../../../../DB/models/Order.js"
import { productModel } from "../../../../DB/models/product.model.js"
import { reviewModel } from "../../../../DB/models/review.model.js"


export const addReview=async(req,res,next)=>{
    const {productId}=req.params
    const{rate,comment}=req.body
     
        if(! await productModel.findOne({_id:productId})){
            return next(new Error('not found product',{cause:404}))
        }
        if(! await orderModel.findOne({
            userId:req.user._id,
            status:'delivered',
            "products.productId":productId

        })){
            return next(new Error(`can't add review without puy product`,{cause:404}))
        }
        const review=await reviewModel.create({
            rate,
            comment,
            createdBy:req.user._id,
            productId,
        })
        res.status(200).json({message:'done',review})
}


