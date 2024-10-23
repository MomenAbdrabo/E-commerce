import { categoryModel } from "../../../DB/models/category.model.js"
import Cloudinary, { uploader } from "../../../utils/Cloudinary.js"
import slugify from "slugify"



export const getCategory = async (req, res, next) => {

    const category = await categoryModel.find().populate([{
        path: 'subcategory'
    }])

    return category ? res.status(200).json({ message: 'done', category })
        : next(new Error('faild fatch data '), { cause: 400 })

}

export const createCategory = async (req, res, next) => {

    const name = req.body.name.toLowerCase()
    if (await categoryModel.findOne({ name })) {
        return next(new Error(`Duplicate category name: ${name}`), { cause: 409 });
    }
    //const { public_id, secure_url } = await Cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/category` })


    const { public_id, secure_url } = await uploader({ path: req.file.path, folderPath: 'category' })

    const category = await categoryModel.create(
        {
            name,
            slug: slugify(name, '-'),
            image: { public_id, secure_url },
            createdBy: req.user._id

        }
    )
    return res.status(200).json({ message: 'done', category })

}
export const updateCategory = async (req, res, next) => {


    const categorty = await categoryModel.findById({ _id: req.params.categoryId })
    if (!categorty) {
        return next(new Error(`ID not founded ${req.params.categoryId} `), { cause: 404 })
    }
    if (req.body.name) {
        req.body.name = req.body.name.toLowerCase()

        if (categorty.name === req.body.name) {
            return next(new Error(`old name same new name`), { cause: 400 })
        }
        if (await categoryModel.findOne({ name: req.body.name })) {
            return next(new Error(`doublicate catcgory name ${req.body.name} `), { cause: 409 })
        }
        categorty.name = req.body.name
        categorty.slug = slugify(req.body.name, '-')
    }

    if (req.file) {
        const { public_id, secure_url } = await uploader({ path: req.file.path, folderPath: 'category' })
        await Cloudinary.uploader.destroy(categorty.image.public_id)
        categorty.image = { public_id, secure_url }
    }
    categorty.updatedBy = req.user._id
    await categorty.save()
    return res.status(201).json({ message: 'done update' })

}