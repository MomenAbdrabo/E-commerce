
import mongoose, { model ,Schema } from "mongoose";


const SubcategorySchema=new Schema({

    name:{
        type:String,
        trim:true,
        unique:[true,'name must be unique'],
        minlenth:[2,'too short category name'],
        required:true
    },
    slug:{
        type:String,
        lowercase:true,
        required:true
    },
    categoryId:{
        type:mongoose.Types.ObjectId,
        ref:`Category`,
    },
    image:{
        type:Object,
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    updatedBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:false
    }

},{
    timestamps:true
})

export const SubcategoryModel=mongoose.models.Subcategory||mongoose.model('Subcategory',SubcategorySchema)