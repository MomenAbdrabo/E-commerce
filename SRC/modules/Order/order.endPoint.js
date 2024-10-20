import { roles } from "../../middleware/authorization.js";


export const endPoint = {
    create: [roles.User],
    cancelOrder: [roles.Admin, roles.User],
    deliveredOrder: [roles.Admin, roles.User],
}