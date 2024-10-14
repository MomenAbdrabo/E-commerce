import joi from 'joi'
import { generalValidation } from '../../middleware/validation.js'



export const createSubcategorySchema = joi.object({
    categoryId: generalValidation.id.required(),
    name: generalValidation.userName.required(),
    file: generalValidation.file.required()
})


export const updateSubcategorySchema = joi.object({
    categoryId: generalValidation.id.required(),
    subcategoryId: generalValidation.id.required(),
    name: generalValidation.userName,
    file: generalValidation.file
})