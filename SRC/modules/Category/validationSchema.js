import joi from 'joi'
import { generalValidation } from '../../middleware/validation.js'



export const createCategorySchema = joi.object({
    name: generalValidation.userName.required(),
    file: generalValidation.file.required()
})


export const updateCategorySchema = joi.object({
    categoryId: generalValidation.id.required(),
    name: generalValidation.userName,
    file: generalValidation.file
})