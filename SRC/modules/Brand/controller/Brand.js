import { brandModel } from "../../../DB/models/brand.mode.js"
import Cloudinary from "../../../utils/Cloudinary.js"



export const getBrand = async (req, res, next) => {

    const brand = await brandModel.find()
    return res.status(200).json({ message: 'done', brand })

}

export const createBrand = async (req, res, next) => {

    const name = req.body.name.toLowerCase()
    if (await brandModel.findOne({ name })) {
        return next(new Error(`doublicate catcgory name ${name} `), { cause: 409 })
    }
    const { public_id, secure_url } = await Cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/Brand` })
    const Brand = await brandModel.create(
        {
            name,
            logo: { public_id, secure_url },
            createdBy: req.user._id
        })
    res.status(200).json({ message: 'done', Brand })

}
export const updateBrand = async (req, res, next) => {


    const brand = await brandModel.findById({ _id: req.params.brandId })
    if (!brand) {
        return next(new Error(`ID not founded ${req.params.BrandID} `), { cause: 404 })
    }
    if (req.body.name) {
        req.body.name = req.body.name.toLowerCase()
        if (brand.name === req.body.name) {
            return next(new Error(`old name same new name`), { cause: 400 })
        }
        if (await brandModel.findOne({ name: req.body.name })) {
            return next(new Error(`doublicate catcgory name ${req.body.name} `), { cause: 409 })
        }
        brand.name = req.body.name
    }

    if (req.file) {
        const { public_id, secure_url } = await Cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/Brand` })
        await Cloudinary.uploader.destroy(brand.image.public_id)
        brand.image = { public_id, secure_url }
    }
    brand.updatedBy = req.user._id
    await brand.save()
    return res.status(201).json({ message: 'done update' })

}