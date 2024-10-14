import { Router } from "express";
import { fileUplouder, FileValidation } from "../../utlis/Multer.js";
import { errorHandler } from "../../utlis/errorHandling.js";
import { Validation } from "../../middleware/validation.js";
import { creatBrandSchema, updateBrandSchema } from "./validationSchema.js"
import * as BrandController from "./controller/Brand.js";
import { auth } from "../../middleware/authorization.js";
import { endPoint } from "./Brand.endPoint.js";

export const brandRouter = Router()


// brandRouter.get('/', errorHandler(getBrand))
// brandRouter.post('/create',
//     auth(endPoint.create),
//     fileUplouder(FileValidation.image).single('image'), Validation(creatBrandSchema),
//     errorHandler(createBrand))

brandRouter
.route('/')
        .get(errorHandler(BrandController.getBrand))
.post(
        auth(endPoint.create),
        fileUplouder(FileValidation.image).single('image'), Validation(creatBrandSchema),
        errorHandler(BrandController.createBrand))

brandRouter.put('/:brandId',
    auth(endPoint.create),
    fileUplouder(FileValidation.image).single('image'), Validation(updateBrandSchema),
        errorHandler(BrandController.updateBrand))