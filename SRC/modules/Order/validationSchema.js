import joi from "joi";
import { generalValidation } from "../../middleware/validation.js";




export const createOrderSchema = joi.object({
    userName: joi.string().min(2).required(),
    address: joi.array().items(joi.string().min(2).required()).required(),
    phone: generalValidation.phone.required(),
    couponName: joi.string().min(2),
    paymentType: joi.string().valid('cash', 'card'),
    products: joi.array().items({
        productId: generalValidation.id,
        quantity: joi.number().min(1).required(),
        color: joi.array().items(joi.string()),
        size: joi.array().items(joi.string().valid('S', 'M', 'L', 'XXL', 'XXXL')),
    })
}).required()


export const canselOrderSchema = joi.object({
    orderId: generalValidation.id,
    reason: joi.string().required(),

}).required()

export const deliveredlOrderSchema = joi.object({
    orderId: generalValidation.id,
    status: joi.string().valid('on way', 'delivered').required(),

}).required()