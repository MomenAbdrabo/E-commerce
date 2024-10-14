import { Router } from "express";
import { fileUplouder, FileValidation } from "../../utlis/Multer.js";
import { getCategory, createCategory, updateCategory } from "./controller/category.js";
import { errorHandler } from "../../utlis/errorHandling.js";
import { Validation } from "../../middleware/validation.js";
import { creatCatcgorySchema, updateCatcgorySchema } from "./validationSchema.js";
import { auth } from "../../middleware/authorization.js";
import { endPoint } from "./catecory.endPoint.js";
import { SubcategoryRouter } from "../SubCategory/Subcategory.router.js";

export const categorRouter = Router()

categorRouter.use('/:categoryId/Subcategory', SubcategoryRouter)

categorRouter.get('/', errorHandler(getCategory))
categorRouter.post('/',
    auth(endPoint.create),
    fileUplouder(FileValidation.image).single('image'), Validation(creatCatcgorySchema),
    errorHandler(createCategory))

categorRouter.put('/:categoryId',
    auth(endPoint.update),
    fileUplouder(FileValidation.image).single('image'), Validation(updateCatcgorySchema),
    errorHandler(updateCategory))