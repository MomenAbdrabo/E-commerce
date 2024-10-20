import { Router } from "express";
import { cancelOrder, createOrder, deliveredOrder, webhook } from "./controller/Order.js";
import { errorHandler } from "../../utils/errorHandling.js";
import { auth } from "../../middleware/authorization.js";
import { endPoint } from "./order.endPoint.js";
import { cancelOrderSchema, createOrderSchema, deliveredOrderSchema } from "./validationSchema.js";
import { Validation } from "../../middleware/validation.js";
import express from 'express'

export const orderRouter = Router()


orderRouter.post('/create',
    auth(endPoint.create),
    Validation(createOrderSchema),
    errorHandler(createOrder))

orderRouter.put('/:orderId',
    auth(endPoint.cancelOrder),
    Validation(cancelOrderSchema),
    errorHandler(cancelOrder))

orderRouter.put('/:orderId/admin',
    auth(endPoint.deliveredOrder),
    Validation(deliveredOrderSchema),
    errorHandler(deliveredOrder))

// webhook
orderRouter.post('/webhook',
    express.raw({ type: 'application/json' }),
    errorHandler(webhook))
