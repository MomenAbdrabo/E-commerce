import { brandModel } from "../../../../DB/models/brand.mode.js"
import { productModel } from "../../../../DB/models/product.model.js"
import { SubcategoryModel } from "../../../../DB/models/subCategory.model.js"
import Cloudinary from "../../../utlis/Cloudinary.js"
import slugify from "slugify"
import ApiFeatures from "../../../utlis/ApiFeatures.js"


export const getproduct=async(req,res,next)=>{

    const ApiFeature=new ApiFeatures(req.query,productModel.find().populate([{
        path:'review'
    }])).select().search().paginate().filter().sort()

    const product=await ApiFeature.mongooseQuery
    let calcReting=0
    let avgRating=0
    let oneProduct={}
    //================ calc rate ============// 
    for (let i = 0; i < product.length; i++) {
            for (let j = 0; j < product[i].review.length; j++) {
               calcReting+=product[i].review[j].rate
                
            }        
            avgRating=parseFloat(calcReting/(product[i].review.length||1))            
            oneProduct=product[i].toObject()
            oneProduct.avegRating=avgRating
            product[i]=oneProduct
    }
    return res.json({message:'done',product})

    // const{limit,skip}=paginate(req.query.page,req.query.size)
    // const excudeQueryParams=['page','size','sort','search','feaild']
    // const filterQuery={...req.query}
    // excudeQueryParams.forEach(param=>{
    //     delete filterQuery[param]
    // })
    // console.log(req.query);
    // console.log(filterQuery);
    
    
    // const mongooseQuery=  productModel.find(JSON.parse(JSON.stringify(filterQuery).replace(/(gt|gte|lt|lte|eq|in|nin|neq)/g,match=>`$${match}`))).populate([{
    //     path:'Review'
    // }]).limit(limit).skip(skip)

    // const product=await mongooseQuery

}

export const createproduct=async(req,res,next)=>{
    
    const {name , discount ,categoryId,subCategoryId, price,brandId}=req.body
    
    if(!await SubcategoryModel.findOne({_id:subCategoryId,categoryId})){
        return next(new Error('in_valid category or subcategory id',{cause:400}))
    }
    if(!await brandModel.findOne({_id:brandId})){
        return next(new Error('in_valid brand id',{cause:400}))
    }
    req.body.slug=slugify(name,'-')


    req.body.priceAfterDiscount=price - (price * ((discount||0)/100))
    
    const {public_id,secure_url}= await Cloudinary.uploader.upload(req.files.mainImage[0].path,
        {folder:`${process.env.APP_NAME}/${categoryId}/${subCategoryId}/product/${name}`})
    
    req.body.mainImage={public_id,secure_url}

    if(req.files.subImage?.length){
        req.body.subImage=[]
        for (const file of req.files.subImage) {
            const {public_id,secure_url}= await Cloudinary.uploader.upload(file.path,
                {folder:`${process.env.APP_NAME}/${categoryId}/${subCategoryId}/product/${name}`})
            req.body.subImage.push({public_id,secure_url})
            }       
    }
    req.body.createdBy=req.user._id

    const product=await productModel.create(req.body)
    if(!product){
        return next(new Error('faild create product',{cause:400}))
    }

    return res.status(200).json({message:'done',product})

}

export const updateProduct=async(req,res,next)=>{
    
    const product = await productModel.findById(req.params.productyId)
    if(!product){
        return next(new Error('in_valid product id',{cause:400}))
    }


    if(req.body.name){
        product.name=req.body.name
        product.slug=slugify(req.body.name,'-')
    }


    if(req.body.price&&req.body.discount){
 product.priceAfterDiscount=req.body.price - (req.body.price * ((req.body.discount||0)/100))
    }else if(req.body.price){
        product.priceAfterDiscount=req.body.price - (req.body.price * ((product.discount||0)/100))
    }else if(req.body.discount){
    product.priceAfterDiscount=product.price - (product.price * ((req.body.discount||0)/100))    
    }
    

    if(req.files.mainImage?.length){
        const {public_id,secure_url}= await Cloudinary.uploader.upload(req.files.mainImage[0].path,
            {folder:`${process.env.APP_NAME}/${product.categoryId}/${product.subCategoryId}/product/${product.name}`})
            await Cloudinary.uploader.destroy(product.mainImage.public_id)
            
        product.mainImage={public_id,secure_url}
    }

    if(req.files.subImage?.length){

       for (const element of product.subImage) {
         
        product.subImage.pop(element)
        
 
       }
        for (const file of req.files.subImage) {
            const {public_id,secure_url}= await Cloudinary.uploader.upload(file.path,
                {folder:`${process.env.APP_NAME}/${product.categoryId}/${product.subCategoryId}/product/${req.body.name}`})
                product.subImage.push({public_id,secure_url})

            }       
           
    }

    if(req.body.stok){
        product.stok=req.body.stok
    }
   await product.save()

   return res.status(201).json({message:'done'})

  
}