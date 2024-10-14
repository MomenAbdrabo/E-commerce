import joi from 'joi'
import { Types } from 'mongoose'

const idValidate = (value, helpar) => {
    return Types.ObjectId.isValid(value) ? true : helpar.message("in-valid id")

}

export const generalValidation = {
    userName: joi.string().min(3).max(35).alphanum(),
    email: joi.string().email({
        minDomainSegments: 2,
        maxDomainSegments: 4,
        tlds: { allow: ['com', 'net'] }
    }),
    password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
    cPassword: joi.string(),
    id: joi.string().custom(idValidate).required(),
    idNotReq: joi.string().custom(idValidate),
    title: joi.string().min(5).max(150).required(),
    caption: joi.string().min(5).max(1000).required(),
    file: joi.object({
        size: joi.number().positive().required(),
        path: joi.string().required(),
        filename: joi.string().required(),
        destination: joi.string().required(),
        mimetype: joi.string().required(),
        encoding: joi.string().required(),
        originalname: joi.string().required(),
        fieldname: joi.string().required(),
        dest: joi.string(),
    }),
    phone: joi.array().items(
        joi.string().pattern(new RegExp(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/)).required()
    ).min(1).max(3),
}





export const Validation = (schema) => {
    return (req, res, next) => {

        const inputData = { ...req.body, ...req.params }
        if (req.file || req.files) {
            inputData.file = req.file || req.files
        }
        const validationResult = schema.validate(inputData, { abortEarly: false })
        if (validationResult.error?.details) {
            return next(new Error(`'validation error' ${validationResult.error} `), { cause: 400 })

        }
        return next()


    }
}