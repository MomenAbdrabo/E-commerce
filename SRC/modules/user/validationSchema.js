import joi from "joi"
import { generalValidation } from "../../middleware/validation.js"



export const updateProfileSchema=joi.object({
    useName:generalValidation.userName,
    oldPassword:generalValidation.password,
    newPassword:generalValidation.password,
    comfirmNewPassword:generalValidation.cPassword.valid(joi.ref("newPassword")) ,
    email:generalValidation.email
}).required()
export const wishListSchema=joi.object({
    productId:generalValidation.id,
}).required()