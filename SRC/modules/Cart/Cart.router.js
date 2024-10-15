import { Router } from "express";
import { endPoint } from "./Cart.endPoint.js";
import { Validation } from "../../middleware/validation.js";
import * as cartController from "./controller/Cart.js";
import { errorHandler } from "../../utils/errorHandling.js";
import { createCartSchema, deleteItemSchema } from "./validationSchema.js";
import { auth } from "../../middleware/authorization.js";
import { cleanCache } from "../../middleware/clearCache.js";


export const cartRouter = Router()

cartRouter.route('/')
    .get(auth(endPoint.create),
        errorHandler(cartController.cart))
    .post(
        auth(endPoint.create),
        cleanCache,
        Validation(createCartSchema),
        errorHandler(cartController.createCart))
    .patch(
        auth(endPoint.create),
        cleanCache,
        Validation(deleteItemSchema),
        errorHandler(cartController.deleteItem))
    .put(
        auth(endPoint.create),
        cleanCache,
        errorHandler(cartController.clearCart))

