
import mongoose, { model, Schema } from "mongoose";


const brandSchema = new Schema({

    name: {
        type: String,
        trim: true,
        unique: [true, 'name must be unique'],
        required: true
    },
    logo: {
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
    }

}, {
    timestamps: true
})

export const brandModel = mongoose.models.Brand || model('Brand', brandSchema)