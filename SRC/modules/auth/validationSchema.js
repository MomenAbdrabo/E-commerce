import joi from "joi";
import { generalValidation } from "../../middleware/validation.js";




export const signupSchema = joi.object({
    userName: generalValidation.userName.required(),
    password: generalValidation.password.required(),
    email: generalValidation.email.required(),
    CPassword: joi.valid(joi.ref('password')).required()
})
export const confirmEmailSchema = joi.object({
    token: joi.string().required(),
})

export const loginSchema = joi.object({
    password: generalValidation.password.required(),
    email: generalValidation.email.required(),
})

export const sendCodeSchema = joi.object({
    email: generalValidation.email
}).required()
export const resetPasswordSchema = joi.object({
    email: generalValidation.email,
    code: joi.string().min(4).max(4),
    password: generalValidation.password,
    CPassword: generalValidation.cPassword.valid(joi.ref('password'))
}).required()