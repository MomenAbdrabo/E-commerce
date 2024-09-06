import joi from "joi";
import { generalValidation } from "../../middleware/validation.js";




export const creatReviewSchema=joi.object({
    rate:joi.number().min(1).max(5).required(),
    comment:joi.string().required(),
    productId:generalValidation.id,
    
}).required()

