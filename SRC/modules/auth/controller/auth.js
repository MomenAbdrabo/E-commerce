import { userModel } from "../../../DB/models/user.model.js"
import sendEmail from "../../../utils/sendEmail.js"
import { generateToken, verifyToken } from "../../../utils/Generate&verifyToken.js"
import { compare, hash } from "../../../utils/Hash&combare.js"
import { customAlphabet } from "nanoid"


export const signUP = async (req, res, next) => {

    const { userName, email, password } = req.body

    if (await userModel.findOne({ email })) {
        return next(Error('email already exsist', { cause: 409 }))
    }
    //    check email

    const token = generateToken({ payload: { email }, expiresIn: 60 * 10 })
    const restartToken = generateToken({ payload: { email }, expiresIn: 60 * 60 * 24 })

    const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`
    const restartlink = `${req.protocol}://${req.headers.host}/auth/newConfirmEmail/${restartToken}`
    const html = `<a href="${link}"> please click to confirm email  </a><br><br>
 
             <a href="${restartlink}">  click to restart email  </a>
 `
    sendEmail({
        to: email,
        subject: 'confirm email',
        text: 'confirm email',
        html
    })

    if (!sendEmail) {
        return next(Error('email reject '), { cause: 409 })
    }
    const hashPassword = hash({ planText: password, saltRound: 7 })


    const { _id } = await userModel.create({ userName: userName.toLowerCase(), email, password: hashPassword })


    res.status(201).json({ message: 'check your email', id: _id })


}
//======================== confirm email ==========================//
export const confirmEmail = async (req, res, next) => {
    const { token } = req.params
    const { email } = verifyToken({ token, signature: process.env.signatureToken })
    if (!email) {
        return next(Error('token not verifyed'), { cause: 409 })
    }
    const user = await userModel.findOneAndUpdate({ email }, { confirmEmail: true })
    if (user) {
        return res.status(201).redirect(`${process.env.FR_URL}/#/login`)
    } else {
        return res.status(409).send(`<P>not register accont</p>`)
    }
}
//==================  ف حاله انه استخدم restartToken ===============//
export const newConfirmEmail = async (req, res, next) => {
    const { token } = req.params
    const { email } = verifyToken({ token, signature: process.env.signatureToken })
    if (!email) {
        return next(Error('token not verifyed'), { cause: 409 })
    }
    const user = await userModel.findOne({ email })
    if (!user) {
        return next(Error('email not register '), { cause: 404 })
    }
    if (user.confirmEmail) {
        return res.status(201).redirect(`${process.env.FR_URL}/#/login`)
    }

    const newToken = generateToken({ payload: { email }, expiresIn: 60 * 4 })

    const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${newToken}`
    const restartlink = `${req.protocol}://${req.headers.host}/auth/newConfirmEmail/${token}`
    const html = `<a href="${link}"> please click to confirm email  </a><br><br>
 
             <a href="${restartlink}">  click to restart email  </a>
 `
    sendEmail({
        to: email,
        subject: 'confirm email',
        text: 'confirm email',
        html
    })

    if (!sendEmail) {
        return next(Error('email reject '), { cause: 409 })
    }

    return res.status(200).send("<p>please check your email </p>")
}
//================== login =====================//
export const login = async (req, res, next) => {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })
    if (!user) {
        return next(new Error('email not register'), { cause: 409 })
    }
    if (!user.confirmEmail) {
        return next(new Error('please confirm email first'), { cause: 404 })
    }
    if (!compare({ planText: password, hashtext: user.password })) {
        return next(new Error('password not match'), { cause: 409 })
    }

    user.status = 'online'
    await user.save()

    const accesToken = generateToken({
        payload: { _id: user._id, role: user.role },
        signature: process.env.signatureToken,
        expiresIn: 60 * 20
    })
    const refreshToken = generateToken({
        payload: { _id: user._id, role: user.role },
        signature: process.env.signatureToken,
        expiresIn: 60 * 60 * 7
    })

    return res.status(200).json({ message: "welcome", accesToken: accesToken, refreshToken })

}

//================== send code to reset password =================//
export const sendCode = async (req, res, next) => {

    const { email } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
        return next(new Error('that acount not register'), { cause: 409 })
    }
    user.forgetCode = customAlphabet('0123456789', 4)()
    await user.save()
    const html = `<p>code : ${user.forgetCode}</p>`
    sendEmail({
        to: email,
        subject: 'forget password code',
        text: 'forget password code',
        html
    })
    if (!sendEmail) {
        return next(Error('filed send email try again'), { cause: 409 })
    }
    res.status(200).json({ message: 'check your email' })
}
//================== rest password ==================//
export const resetPassword = async (req, res, next) => {
    const { email, code, password } = req.body

    const user = await userModel.findOne({ email })

    if (user.forgetCode != code) {
        return next(new Error('code not matched '), { cause: 409 })
    }
    user.password = hash({ planText: password })
    user.forgetCode = null
    user.changeAccessTokenTime = Date.now()
    await user.save()
    return res.status(200).json({ message: "done" })
}