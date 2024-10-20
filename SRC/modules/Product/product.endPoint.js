import { roles } from "../../middleware/authorization.js";




export const endPoint = {
    create: [roles.Admin],
    update: [roles.Admin]
}