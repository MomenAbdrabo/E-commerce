
import mongoose, { model, Schema } from "mongoose";


const productSchema = new Schema({

    name: {
        type: String,
        trim: true,
        lowercase: true,
        minlenth: [2, 'too short title name'],
        required: true
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    size: {
        type: [String],
        enum: ['s', 'l', 'xl', 'xxl']
    },
    color: [{ type: String }],
    mainImage: {
        type: Object,
    },
    subImage: {
        type: [Object],
    },
    price: {
        type: Number,
        default: 1,
        min: 0,
        required: true,

    },
    discount: {
        type: Number,
        max: 100,
        default: 0,
        min: 0
    },
    priceAfterDiscount: {
        type: Number,
        default: 1,
        min: 0,

    },

    descreption: {
        type: String,
        minlenth: [4, 'minmum lenth 4 character'],
        maxlenth: [300, 'maxmum lenth 300 character']
    },
    stock: {
        type: Number,
        default: 0,
        min: 0,
    },

    ratingAvg: {
        type: Number,
        min: 1,
        max: 5
    }
    ,
    ratingCount: {
        type: Number,
        min: 1,
        max: 5
    },

    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: 'category'
    },
    subCategoryId: {
        type: mongoose.Types.ObjectId,
        ref: 'subCategory'
    },
    brandId: {
        type: mongoose.Types.ObjectId,
        ref: 'brand'
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
    },
    washUserList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    isDeleted: { type: Boolean, default: false }

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
})

productSchema.virtual('review', {
    localField: "_id",
    foreignField: "productId",
    ref: 'Review'
})

export const productModel = mongoose.models.Product || model('Product', productSchema)