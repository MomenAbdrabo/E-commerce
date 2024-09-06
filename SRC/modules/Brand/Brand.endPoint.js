import { roles } from "../../middleware/authorization.js";

export const endPoint={
    create:[roles.Admin,roles.User],
    update:[roles.Admin,roles.User]
}