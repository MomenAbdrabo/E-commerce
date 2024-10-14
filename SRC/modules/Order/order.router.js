import { Router } from "express";
import { cancelOrder, createOrder, deliveredlOrder, webhook } from "./controller/Order.js";
import { errorHandler } from "../../utlis/errorHandling.js";
import { auth } from "../../middleware/authorization.js";
import { endPoint } from "./order.endPoint.js";
import { canselOrderSchema, createOrderSchema, deliveredlOrderSchema } from "./validationSchema.js";
import { Validation } from "../../middleware/validation.js";
import express from 'express'

export const orderRouter = Router()


orderRouter.post('/create',
    auth(endPoint.create),
    Validation(createOrderSchema),
    errorHandler(createOrder))

orderRouter.put('/:orderId',
    auth(endPoint.canselOrder),
    Validation(canselOrderSchema),
    errorHandler(cancelOrder))

orderRouter.put('/:orderId/admin',
    auth(endPoint.deliveredlOrder),
    Validation(deliveredlOrderSchema),
    errorHandler(deliveredlOrder))

// webhook
orderRouter.post('/webhook',
    express.raw({ type: 'application/json' }),
    errorHandler(webhook))
