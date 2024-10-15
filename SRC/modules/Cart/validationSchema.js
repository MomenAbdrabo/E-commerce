import joi from "joi";
import { generalValidation } from "../../middleware/validation.js";




export const createCartSchema = joi.object({

    quantity: joi.number().integer(),
    productId: generalValidation.id.required(),
}).required()
export const deleteItemSchema = joi.object({
    productId: generalValidation.id.required(),
}).required()

