
import mongoose, { model, Schema } from "mongoose";


const userSchema = new Schema({

    userName: {
        type: String,
        trim: true,
        minlenth: [2, 'too short user name'],
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlenth: [6, 'minmum lenth 6 caracter'],
        required: true
    },
    profImg: {
        type: Object,
    },
    phone: {
        type: String,
        minlenth: 12,
        maxlenth: 12,
    },
    address: {
        type: String
    }
    ,
    role: {
        type: String,
        enum: ['user', 'admin', 'saler'],
        default: 'user'
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        default: 'male'
    },
    status: {
        type: String,
        enum: ['online', 'offline', 'blocked'],
        default: 'offline'
    },

    confirmEmail: {
        type: Boolean,
        default: false
    },
    forgetCode: {
        type: String,
        default: null

    },
    changeAccessTokenTime: {
        type: Date
    },
    washList: [{
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    }],

}, {
    timestamps: true
})

export const userModel = mongoose.models.User || model('User', userSchema)