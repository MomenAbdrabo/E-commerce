import { Router } from "express";
import { fileUplouder, FileValidation } from "../../utlis/Multer.js";
import { createCoupon, updateCoupon } from "./controller/coupon.js";
import { creatCouponSchema, updateCouponSchema } from "./validationSchema.js";
import { Validation } from "../../middleware/validation.js";
import { errorHandler } from "../../utlis/errorHandling.js";
import { auth } from "../../middleware/authorization.js";
import { endPoint } from "./Coupon.endPoint.js";

export const couponRouter = Router()


couponRouter.post('/create',
    auth(endPoint.create),
    fileUplouder(FileValidation.image).single('image'),
    Validation(creatCouponSchema),
    errorHandler(createCoupon))

couponRouter.put('/:couponId/update',
    auth(endPoint.update),
    fileUplouder(FileValidation.image).single('image'),
    Validation(updateCouponSchema),
    errorHandler(updateCoupon))