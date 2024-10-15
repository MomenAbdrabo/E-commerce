import { Router } from "express";

import { errorHandler } from "../../utils/errorHandling.js";
import { Validation } from "../../middleware/validation.js";
import { fileUplouder, FileValidation } from "../../utils/Multer.js";
import { createSubcategorySchema, updateSubcategorySchema } from "./validationSchema.js";
import { auth } from "../../middleware/authorization.js";
import { endPoint } from "./subCategory.endPoint.js";
import { createSubcategory, getSubcategory, updateSubcategory } from "./controller/Subcategory.js";

export const SubcategoryRouter = Router({ mergeParams: true })

SubcategoryRouter.get('/', errorHandler(getSubcategory))

SubcategoryRouter.post('/',
    auth(endPoint.create),
    fileUplouder(FileValidation.image).single('image'), Validation(createSubcategorySchema),
    errorHandler(createSubcategory))

SubcategoryRouter.put('/:subcategoryId',
    auth(endPoint.update),
    fileUplouder(FileValidation.image).single('image'), Validation(updateSubcategorySchema),
    errorHandler(updateSubcategory))