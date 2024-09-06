import joi from 'joi'
import { generalValidation } from '../../middleware/validation.js'



export const creatBrandSchema=joi.object({
    name:generalValidation.userName.required(),
    file:generalValidation.file.required()
})


export const updateBrandSchema=joi.object({
    brandId:generalValidation.id.required(),
    name:generalValidation.userName,
    file:generalValidation.file
})