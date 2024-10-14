import { roles } from "../../middleware/authorization.js";

export const endPoint = {
    update: [roles.User],
    wishList: [roles.User],
}