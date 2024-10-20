import joi from "joi";



//==================The project was initiated on January 1st============//
export const getSalesSchema = joi.object({
    startPeriod: joi.date().greater("1/1/2024").required(),
    endPeriod: joi.date().less(new Date()+1).required(),

}).required()
