
import mongoose, { Schema } from "mongoose";


const categorySchema = new Schema({

    name: {
        type: String,
        trim: true,
        unique: [true, 'name must be unique'],
        minlenth: [2, 'too short category name'],
        lowercase: true,
        required: true,
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    image: {
        type: Object,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    updatedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: false
    }

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
})

categorySchema.virtual('subcategory', {
    localField: '_id',
    foreignField: 'categoryId',
    ref: 'Subcategory'
})



export const categoryModel = mongoose.models.Category || mongoose.model('Category', categorySchema)