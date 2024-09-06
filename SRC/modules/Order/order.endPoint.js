import { roles } from "../../middleware/authorization.js";


export const endPoint={
    create:[roles.User],
    canselOrder:[roles.Admin,roles.User],
    deliveredlOrder:[roles.Admin,roles.User],
}