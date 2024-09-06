import { Router } from "express";
import { errorHandler } from "../../utlis/errorHandling.js";
import { signUP, confirmEmail, newConfirmEmail, login, sendCode, resetPassword} from "./controller/auth.js";
import { confirmEmailSchema, loginSchema, resetPasswordSchema, sendCodeSchema, signupSchema } from "./validationSchema.js";
import { Validation } from "../../middleware/validation.js";
import { auth } from "../../middleware/authorization.js";
import { endPoint } from "./auth.endpoint.js";

export const authRouter=Router()


authRouter.post("/signUp",Validation(signupSchema),errorHandler(signUP))
authRouter.get("/confirmEmail/:token",Validation(confirmEmailSchema),errorHandler(confirmEmail))
authRouter.get("/newConfirmEmail/:token",Validation(confirmEmailSchema),errorHandler(newConfirmEmail))

// ##################### login  ##################### //

authRouter.post('/login',Validation(loginSchema),errorHandler(login))

authRouter.get("/sendCode",auth(endPoint.create),Validation(sendCodeSchema),errorHandler(sendCode))
authRouter.patch('/resetPassword',auth(endPoint.create),Validation(resetPasswordSchema),errorHandler(resetPassword))


