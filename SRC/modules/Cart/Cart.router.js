import { Router } from "express";
import { endPoint } from "./Cart.endPoint.js";
import { Validation } from "../../middleware/validation.js";
import { clearCart, createCart, deleteItem } from "./controller/Cart.js";
import { errorHandler } from "../../utlis/errorHandling.js";
import { creatCartSchema, deleteItemSchema } from "./validationSchema.js";
import { auth } from "../../middleware/authorization.js";


export const cartRouter=Router()


cartRouter.post('/addToCart',
    auth(endPoint.create),
    Validation(creatCartSchema),
    errorHandler(createCart))

cartRouter.post('/deleteItem',
    auth(endPoint.create),
    Validation(deleteItemSchema),
    errorHandler(deleteItem))

cartRouter.post('/clearCart',
    auth(endPoint.create),
    errorHandler(clearCart))

