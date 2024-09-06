import { Router } from "express";
import {  creatReviewSchema } from "./validationSchema.js";
import { Validation } from "../../middleware/validation.js";
import { errorHandler } from "../../utlis/errorHandling.js";
import { auth } from "../../middleware/authorization.js";
import { addReview } from "./controller/review.js";
import { endPoint } from "./review.endPoint.js";

export const reviewRouter=Router({mergeParams:true})


reviewRouter.post('/addReview',
    auth(endPoint.add),
    Validation(creatReviewSchema),
    errorHandler(addReview))

