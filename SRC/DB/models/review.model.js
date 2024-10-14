
import mongoose, { model, Schema } from "mongoose";


const reviewSchema = new Schema({
    rate: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    comment: {
        type: String,

    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref: 'product',
        required: true
    },

    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },

}, {
    timestamps: true
})

export const reviewModel = mongoose.models.Review || model("Review", reviewSchema)