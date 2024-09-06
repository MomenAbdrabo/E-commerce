import { Router } from "express";
import { endPoint } from "./user.endPoint.js";
import { fileUplouder, FileValidation } from "../../utlis/Multer.js";
import { Validation } from "../../middleware/validation.js";
import {  updateProfileSchema, wishListSchema } from "./validationSchema.js";
import { auth } from "../../middleware/authorization.js";
import { errorHandler } from "../../utlis/errorHandling.js";
import {  addToWishList, getWishList, removerFromWishList, updateProfile } from "./controller/user.js";


export const userRouter = Router()

userRouter.patch('/updateProfile',
        auth(endPoint.update),
        fileUplouder(FileValidation.image).single('image'),
        Validation(updateProfileSchema),
        errorHandler(updateProfile))

userRouter.put('/:productId/addToWishList',
        auth(endPoint.wishList),
        Validation(wishListSchema),
        errorHandler(addToWishList))


userRouter.get('/getWishList',
        auth(endPoint.wishList),
        errorHandler(getWishList))

        
userRouter.put('/:productId/removerFromWishList',
        auth(endPoint.wishList),
        Validation(wishListSchema),
        errorHandler(removerFromWishList))