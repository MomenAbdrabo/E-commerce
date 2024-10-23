import { Router } from "express";
import { endPoint } from "./user.endPoint.js";
import { fileUplouder, FileValidation } from "../../utils/Multer.js";
import { Validation } from "../../middleware/validation.js";
import { updateProfileSchema, wishListSchema } from "./validationSchema.js";
import { auth } from "../../middleware/authorization.js";
import { errorHandler } from "../../utils/errorHandling.js";
import * as userController from "./controller/user.js";


export const usersRouter = Router()

usersRouter.patch('/updateProfile',
        auth(endPoint.update),
        fileUplouder(FileValidation.image).single('image'),
        Validation(updateProfileSchema),
        errorHandler(userController.updateProfile))

usersRouter.put('/:productId/addToWishList',
        auth(endPoint.wishList),
        Validation(wishListSchema),
        errorHandler(userController.addToWishList))


usersRouter.get('/wishList',
        auth(endPoint.wishList),
        errorHandler(userController.getWishList))


usersRouter.put('/:productId/removerFromWishList',
        auth(endPoint.wishList),
        Validation(wishListSchema),
        errorHandler(userController.removerFromWishList))