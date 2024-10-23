import { productModel } from "../../../DB/models/product.model.js"
import { userModel } from "../../../DB/models/user.model.js"
import Cloudinary from "../../../utils/Cloudinary.js"
import { compare, hash } from "../../../utils/Hash&combare.js"



export const updateProfile = async (req, res, next) => {
    const user = await userModel.findById({ _id: req.user._id })
    if (!user) {
        return next(new Error(`ID not founded ${req.user._id} `), { cause: 404 })
    }
    if (req.body.userName) {
        req.body.userName = req.body.userName.toLowerCase()
        if (user.userName === req.body.userName) {
            return next(new Error(`old userName same new userName`), { cause: 400 })
        }
        if (await userModel.findOne({ userName: req.body.userName })) {
            return next(new Error(`doublicate category userName ${req.body.userName} `), { cause: 409 })
        }
        user.userName = req.body.userName
    }

    if (req.file) {
        const { public_id, secure_url } = await Cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_userName}/user` })
        await Cloudinary.uploader.destroy(user.profImg.public_id)
        user.profImg = { public_id, secure_url }
    }
    if (req.body.oldPassword && req.body.newPassword) {

        const match = compare(
            {
                planText: req.body.oldPassword,
                hashtext: user.password
            })

        if (!match) {
            return next(new Error(`old password not match password account`), { cause: 400 })
        }
        user.password = hash({ plaintext: req.body.newPassword })
        user.changeAccessTokenTime = Date.now()
    }
    if (req.body.newEmail) {
        const user = await userModel.findById({ _id: req.user._id })
        if (!user) {
            return next(new Error(`ID not founded ${req.user._id} `), { cause: 404 })
        }
        if (await userModel.findOne({ email: req.body.newEmail })) {
            return next(new Error(`con't duplicate email `), { cause: 400 })
        }
        if (req.body.newEmail == user.email) {
            return next(new Error(`new email same old email `), { cause: 404 })
        }
        user.email = req.body.newEmail
        user.changeAccessTokenTime = Date.now()
    }
    user.updatedBy = req.user._id
    await user.save()
    return res.status(201).json({ message: 'done update' })

}

export const addToWishList = async (req, res, next) => {
    const { productId } = req.params

    if (! await productModel.findById(productId)) {
        return next(new Error('not found that product', { cause: 404 }))
    }

    if (await userModel.findOne({ washList: { $in: productId } })) {
        return next(new Error('you already add to wish list', { cause: 404 }))
    }


    await userModel.updateOne({ _id: req.user._id }, { $addToSet: { washList: productId } })
    return res.status(200).json({ message: 'added done' })


}

export const getWishList = async (req, res, next) => {

    let user = await userModel.findById(req.user._id)
    return res.status(200).json({ wishList: user.washList })

}

export const removerFromWishList = async (req, res, next) => {
    const { productId } = req.params

    if (! await productModel.findById(productId)) {
        return next(new Error('not found that product', { cause: 404 }))
    }

    const remover = await userModel.updateOne({ _id: req.user._id }, { $pull: { washList: productId } })
    if (!remover.modifiedCount) {
        return next(new Error('faild remove product', { cause: 404 }))

    }
    return res.status(200).json({ message: 'removed' })

}