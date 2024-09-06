import { roles } from "../../middleware/authorization.js";


export const endPoint={
    add:[roles.User],
}