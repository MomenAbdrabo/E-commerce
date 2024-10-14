import { Router } from "express";
import { errorHandler } from "../../utlis/errorHandling.js";
import * as authController from "./controller/auth.js";
import { confirmEmailSchema, loginSchema, resetPasswordSchema, sendCodeSchema, signupSchema } from "./validationSchema.js";
import { Validation } from "../../middleware/validation.js";
import { auth } from "../../middleware/authorization.js";
import { endPoint } from "./auth.endpoint.js";
export const authRouter = Router()


authRouter.post("/signUp", Validation(signupSchema), errorHandler(authController.signUP))
authRouter.get("/confirmEmail/:token", Validation(confirmEmailSchema), errorHandler(authController.confirmEmail))
authRouter.get("/newConfirmEmail/:token", Validation(confirmEmailSchema), errorHandler(authController.newConfirmEmail))

// ##################### login  ##################### //

authRouter.post('/login', Validation(loginSchema), errorHandler(authController.login))

authRouter.get("/sendCode", auth(endPoint.create), Validation(sendCodeSchema), errorHandler(authController.sendCode))
authRouter.patch('/resetPassword', auth(endPoint.create), Validation(resetPasswordSchema), errorHandler(authController.resetPassword))


