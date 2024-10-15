import { categoryModel } from "../../../DB/models/category.mode.js"
import { SubcategoryModel } from "../../../DB/models/Subcategory.model.js"
import Cloudinary from "../../../utils/Cloudinary.js"
import slugify from "slugify"


export const getSubcategory = async (req, res, next) => {

    const Subcategory = await SubcategoryModel.find().populate([{
        path: 'categoryId'
    }])
    return res.json({ message: 'done', Subcategory })

}



export const createSubcategory = async (req, res, next) => {

    const name = req.body.name.toLowerCase()
    const { categoryId } = req.params
    if (! await categoryModel.findOne({ _id: categoryId })) {
        return next(new Error(`not found category Id `), { cause: 404 })
    }
    if (await SubcategoryModel.findOne({ name })) {
        return next(new Error(`doublicate catcgory name ${name} `), { cause: 409 })
    }
    const { public_id, secure_url } = await Cloudinary.uploader.upload(req.file.path, { folder: `/Category/Subcategory` })

    const Subcategory = await SubcategoryModel.create(
        {
            name,
            slug: slugify(name, '-'),
            image: { public_id, secure_url },
            categoryId,
            createdBy: req.user._id
        }
    )
    return res.status(200).json({ message: 'done', Subcategory })
}


export const updateSubcategory = async (req, res, next) => {


    const Subcategory = await SubcategoryModel.findById({ _id: req.params.subcategoryId })
    if (!Subcategory) {
        return next(new Error(`ID not founded ${req.params.subcategoryId} `), { cause: 404 })
    }
    if (req.body.name) {
        req.body.name = req.body.name.toLowerCase()
        if (Subcategory.name === req.body.name) {
            return next(new Error(`old name same new name`), { cause: 400 })
        }
        if (await SubcategoryModel.findOne({ name: req.body.name })) {
            return next(new Error(`doublicate catcgory name ${req.body.name} `), { cause: 409 })
        }
        Subcategory.name = req.body.name
        Subcategory.slug = slugify(req.body.name, '-')
    }

    if (req.file) {
        const { public_id, secure_url } = await Cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/Subcategory` })
        if (Subcategory.image) {
            await Cloudinary.uploader.destroy(Subcategory.image.public_id)
        }
        Subcategory.image = { public_id, secure_url }
    }
    Subcategory.updateBy = req.user._id
    await Subcategory.save()
    return res.status(201).json({ message: 'done update' })

}