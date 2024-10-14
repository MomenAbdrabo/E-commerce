import joi from 'joi'
import { generalValidation } from '../../middleware/validation.js'



export const creatProductSchema = joi.object({
    name: joi.string().min(2).max(30).required(),
    descreption: joi.string().min(2).max(150).required(),
    price: joi.number().positive().min(1).required(),
    discount: joi.number().positive().min(1),
    stock: joi.number().integer().positive().min(1),
    size: joi.array(),
    color: joi.array(),

    categoryId: generalValidation.id.required(),
    subCategoryId: generalValidation.id.required(),
    brandId: generalValidation.id.required(),

    file: joi.object(
        {
            mainImage: joi.array().items(generalValidation.file).length(1).required(),
            subImage: joi.array().items(generalValidation.file).min(1).max(5)
        }
    ).required()
})


export const updateProductSchema = joi.object({
    productyId: generalValidation.id.required(),
    name: joi.string().min(2).max(30),
    descreption: joi.string().min(2).max(150),
    price: joi.number().positive().min(1),
    discount: joi.number().positive().min(1),
    stock: joi.number().integer().positive().min(1),
    size: joi.array(),
    color: joi.array(),
    file: joi.object(
        {
            mainImage: joi.array().items(generalValidation.file).length(1),
            subImage: joi.array().items(generalValidation.file).min(1).max(5)
        }
    )

})