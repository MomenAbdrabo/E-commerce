import { Router } from "express";
import { fileUplouder, FileValidation } from "../../utils/Multer.js";
import { getCategory, createCategory, updateCategory } from "./controller/category.js";
import { errorHandler } from "../../utils/errorHandling.js";
import { Validation } from "../../middleware/validation.js";
import { createCategorySchema, updateCategorySchema } from "./validationSchema.js";
import { auth } from "../../middleware/authorization.js";
import { endPoint } from "./category.endPoint.js";
import { SubcategoryRouter } from "../SubCategory/Subcategory.router.js";

export const categoryRouter = Router()

categoryRouter.use('/:categoryId/Subcategory', SubcategoryRouter)

categoryRouter.get('/', errorHandler(getCategory))
categoryRouter.post('/',
    auth(endPoint.create),
    fileUplouder(FileValidation.image).single('image'), Validation(createCategorySchema),
    errorHandler(createCategory))

categoryRouter.put('/:categoryId',
    auth(endPoint.update),
    fileUplouder(FileValidation.image).single('image'), Validation(updateCategorySchema),
    errorHandler(updateCategory))