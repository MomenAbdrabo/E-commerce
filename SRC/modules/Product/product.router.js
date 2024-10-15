import { Router } from "express";
import { createproduct, getproduct, updateProduct } from "./controller/product.js";
import { errorHandler } from "../../utils/errorHandling.js";
import { fileUplouder, FileValidation } from "../../utils/Multer.js";
import { Validation } from "../../middleware/validation.js";
import { creatProductSchema, updateProductSchema } from "./validationSchema.js";
import { endPoint } from "./product.endPoint.js";
import { auth } from "../../middleware/authorization.js";
import { reviewRouter } from "../Review/review.router.js";

export const productRouter = Router()
//=============== review router =============//

productRouter.use('/:productId', reviewRouter)

//=============== product ===============//
productRouter.get('/', errorHandler(getproduct))
productRouter.post('/createProduct',
    auth(endPoint.create),
    fileUplouder(FileValidation.image).fields([
        { name: 'mainImage' },
        { name: 'subImage' }
    ]), Validation(creatProductSchema),
    errorHandler(createproduct))

productRouter.put('/:productyId',
    auth(endPoint.update),
    fileUplouder(FileValidation.image).fields([
        { name: 'mainImage' },
        { name: 'subImage' }
    ]), Validation(updateProductSchema),
    errorHandler(updateProduct))