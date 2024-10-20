import joi from "joi";
import { generalValidation } from "../../middleware/validation.js";




export const createCouponSchema = joi.object({
    code: joi.string().min(2).max(12).required(),
    disCount: joi.number().positive().min(1).max(100).required(),
    expireDate: joi.date().greater(new Date()).required(),
    createdBy: generalValidation.idNotReq,
    usedBy: generalValidation.idNotReq,
    file: generalValidation.file
}).required()

export const updateCouponSchema = joi.object({
    couponId: generalValidation.id,
    code: joi.string().min(2).max(12),
    disCount: joi.number().positive().min(1).max(100),
    expireDate: joi.date().greater(new Date()),
    file: generalValidation.file
}).required()