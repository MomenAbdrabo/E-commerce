import { Router } from "express";
import * as salesController from "./controller/salesReport.js";
import { auth, roles } from "../../middleware/authorization.js";
import { errorHandler } from "../../utils/errorHandling.js";
import { endPoint } from "./salesReport.endPoint.js";
import { getSalesSchema } from "./validationSchema.js";
import { Validation } from "../../middleware/validation.js";

export const salesRouter=Router()


salesRouter.get('/today',
    auth(endPoint.getSales),
    errorHandler(salesController.getTodaySales))

salesRouter.post('/',
    auth(endPoint.getSales),
    Validation(getSalesSchema),
    errorHandler(salesController.getAnyPeriodSales))
