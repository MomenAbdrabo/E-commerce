
import mongoose, { model, Schema } from "mongoose";


const cartSchema = new Schema({


    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    product: [
        {
            productId: {
                type: mongoose.Types.ObjectId,
                ref: "User",
                required: true
            },
            quantity: { type: Number, default: 1, required: true }
        }
    ],

}, {
    timestamps: true
})

export const cartModel = mongoose.models.Cart || model('Cart', cartSchema)