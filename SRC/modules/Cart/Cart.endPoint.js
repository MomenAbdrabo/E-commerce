import { roles } from "../../middleware/authorization.js";


export const endPoint={
    create:[roles.User],
    update:[roles.User]
}