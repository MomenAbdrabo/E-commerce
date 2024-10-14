import { userModel } from "../DB/models/user.model.js"
import { verifyToken } from "../utlis/Generate&verifyToken.js"

export const roles = {
    Admin: 'admin',
    User: 'user',
}

export const auth = (accesRole = []) => {
    return async (req, res, next) => {
        const { authorization } = req.headers

        if (!authorization?.startsWith(process.env.Bearer_Key)) {
            return next(new Error('in-valid token'), { cause: 409 })
        }
        const token = authorization.split(process.env.Bearer_Key)[1]

        const decoded = verifyToken({ token, signature: process.env.signatureToken })
        if (decoded.error) {
            return next(new Error('in-valid token '), { cause: 409 })
        }
        const user = await userModel.findById(decoded._id).select("userName image role changeAccessTokenTime")
        if (!user) {
            return next(new Error(`not register user `), { cause: 401 })
        }
        if (parseInt(user.changeAccessTokenTime?.getTime() / 1000) >= decoded.iat) {
            return next(new Error(`token expired `), { cause: 400 })

        }
        if (!accesRole.includes(user.role)) {
            return next(new Error('not authorized user '), { cause: 403 })
        }

        req.user = user
        return next()
    }
}