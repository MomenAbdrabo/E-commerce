import { roles } from "../../middleware/authorization.js";


export const endPoint = {
    getSales: [roles.Admin],
}