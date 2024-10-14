import { Router } from "express";
import { endPoint } from "./user.endPoint.js";
import { fileUplouder, FileValidation } from "../../utlis/Multer.js";
import { Validation } from "../../middleware/validation.js";
import { updateProfileSchema, wishListSchema } from "./validationSchema.js";
import { auth } from "../../middleware/authorization.js";
import { errorHandler } from "../../utlis/errorHandling.js";
import * as userController from "./controller/user.js";


export const userRouter = Router()

userRouter.patch('/updateProfile',
        auth(endPoint.update),
        fileUplouder(FileValidation.image).single('image'),
        Validation(updateProfileSchema),
        errorHandler(userController.updateProfile))

userRouter.put('/:productId/addToWishList',
        auth(endPoint.wishList),
        Validation(wishListSchema),
        errorHandler(userController.addToWishList))


userRouter.get('/wishList',
        auth(endPoint.wishList),
        errorHandler(userController.getWishList))


userRouter.put('/:productId/removerFromWishList',
        auth(endPoint.wishList),
        Validation(wishListSchema),
        errorHandler(userController.removerFromWishList))