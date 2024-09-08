import Stripe from "stripe"
import { cartModel } from "../../../../DB/models/cart.js"
import { couponModel } from "../../../../DB/models/coupon.model.js"
import { orderModel } from "../../../../DB/models/Order.js"
import { productModel } from "../../../../DB/models/product.model.js"
import payment from "../../../utlis/payment.js"
import { createInvoice } from "../../../utlis/pdf.js"
import { deleteItemFromCart, emptyCart } from "../../Cart/controller/Cart.js"

//===================== ف حالة اني بضيف من cart or req.body==========//


export const createOrder=async(req,res,next)=>{
    const {address, userName , phone ,note,couponName,paymentType}=req.body

    //============== ف حالة ان مش فارق معاك تفسر ال res =============//
    // if(couponName){
    //   const coupon=await couponModel.findOne({code:couponName.toLowerCase() ,usedBy:{$nin:req.user._id}})
    //     if(!coupon||coupon.expireDate.getTime()<Date.now()){
    //         return next(new Error('in-valid coupon '),{cause:400})
    //     }
    // }
    //============== ف حالة انك محتاج تفسر res ==============//
    const cart =await cartModel.findOne({userId:req.user._id})
    if(!req.body.products){
        if(!cart?.product?.length){
            return next(new Error('empty cart'),{cause:400})            
        }
        req.body.isCart=true
        req.body.products=cart.product
    }

    //================= use coupon ==================//
        if(couponName){
        const coupon=await couponModel.findOne({code:couponName})
        if(!coupon){
             return next(new Error('not found coupon'),{cause:404})
        }
        if(coupon.expireDate.getTime()<Date.now()){
            return next(new Error(' expire coupon '),{cause:400})
        }
        if(coupon.usedBy.includes(req.user._id)){
            return next(new Error('sorry you can use coupon only one '),{cause:400}) 
        } 
        req.body.coupon=coupon        
    }

    let productMessage=[]
    let totalPrice=0
    let productIds=[]
    let productList=[]
    for (let product of req.body.products) {
        const checkProduct=await productModel.findOne({
            _id:product.productId,
            })
            
        if(!checkProduct){
            return next(new Error(`not found product ${product.name}`),{cause:404})
        }
        // لو الكميه الي عايزها اليوزر اكتر من الي ف الاستوك هيحطله الي ف الاستوك
       // لو الاستوك مفيهوش هيقوله ان مش متوفر 
        if(checkProduct.stock<product.quantity){
            if (checkProduct.stock==0) {
        return next(new Error(`${checkProduct.name} not available`),{cause:404})

            }
            product.quantity=checkProduct.stock
            productMessage.push(`The available quantity of ${checkProduct.name} is ${checkProduct.stock}. `)
            
        }
        // لو بيعمل الاوردر من الكارت ف بتالي انت واخد انستنس مش هينفع تعدل عليه 
       //عشان كدا استخدمت toObject()
        if(req.body.isCart){
            product=product.toObject()
        }
        // تجهيز كل الاوردر
        productIds.push(product.productId)
        product.productName=checkProduct.name;
        product.unitPrice=checkProduct.priceAfterDiscount
        product.totalPrice=(product.unitPrice * product.quantity)   
        totalPrice+= product.totalPrice
        productList.push(product)
        
    }
    // calac final price after discount 
    let finalPrice=parseFloat(totalPrice - (totalPrice* ((req.body.coupon?.disCount||0)/100)));
    //creat order
    const order= await orderModel.create(
        {
            userId:req.user._id,
            userName,
            address,
            phone,
            note,
            products:productList,
            couponId:req.body.coupon?._id,
            totalPrice,
            finalPrice,
            paymentType,
            status:paymentType=='cash'?'wait payment':'placed'
        }
    )
    // تنزيل الكميه من ال stok
    for (const product of productList) {
     await productModel.updateOne({_id:product.productId},{$inc:{stock:-product.quantity}})
    }
    //بنضيف اليوزر انه استخدم الكوبون عشان م يستخدمهوش تاني 
    if(req.body.coupon){
        await couponModel.updateOne({_id:req.body.coupon._id},{$addToSet:{usedBy:req.user._id}})    
    }
    // نفضي الكارت بعد ما عمل الارورد 
    if(req.body.isCart){
        // ف حالت انك بتعمل الارودر كله من ال cart
        //ف هتمسح ال all item of cart
        await emptyCart(req.user._id)
    }else{
        await deleteItemFromCart(req.user._id,productIds)
    }

    // generat pdf
    const invoice = {
    shipping: {
        name: userName,
        address,
        city: "nasr city",
        state: "cairo",
        country: "Egypt",
        postal_code: 94111
    },
    items:productList,
    subtotal:totalPrice*100,
    total:finalPrice*100,
    invoice_nr: order._id,
    date:order.createdAt
    };
    createInvoice(invoice, "invoice.pdf");
    // section payment 
   
    if(order.paymentType=="card"){
        const stripe=new Stripe(process.env.STRIPE_KEY)
        if(req.body.coupon){
            console.log(req.body.coupon.disCount,req.body.coupon);

        const {id}=await stripe.coupons.create({percent_off:req.body.coupon.disCount,duration:'once'})
        req.body.couponId=id
       console.log(req.body.couponId);
       
    }
        
   const session=await payment({
        stripe,
        customer_email:req.user.email,
        metadata:{
            orderId:order._id.toString()
        },
        cancel_url:`${process.env.CANCEL_URL}?orderId=${order._id.toString()}`,
        success_url:`${process.env.SUCCESS_URL}?orderId=${order._id.toString()}/admin`,
        line_items:order.products.map(product=>{ 
            return {
                price_data:{
                    currency:'usd',
                    product_data:{
                        name:product.productName,    
                    },
                    unit_amount:product.unitPrice*100,
                },
                quantity:product.quantity

            }
        }),
        discounts:req.body.couponId?[{coupon:req.body.couponId}]:[]

    })
    
    return res.status(200).json({message:'done',productMessage,session,url:session.url})

    }

    // if paymentType != card
    return res.status(200).json({message:'done',productMessage,invoice})

}



//============== cancel order ==========//

export const cancelOrder=async(req,res,next)=>{
    const {orderId}=req.params
    const{reason}=req.body

    const order=await orderModel.findOne({_id:orderId,userId:req.user._id})
    if(!order){
        return next(new Error('not founded that order check id ',{cause:404}))
    }else if((order.status!='place'&& order.paymentType==='cash')
             ||(order.status!='wait payment'&& order.paymentType==='card')   ){

        return next(new Error(`not I can\'t cansel order after changed to ${order.status}  ` ,{cause:404}))

             }
     order.status='cancelled'  
     order.reason=reason 
     order.save()   
     
     for (const product of order.products) {
        await productModel.updateOne({_id:product.productId},{$inc:{stock:product.quantity}})
       }
       if(req.body.coupon){
           await couponModel.updateOne({_id:req.body.coupon._id},{$pull:{usedBy:req.user._id}})    
       }

   return res.status(200).json({message:'canselled order'})   
}


//================= updete order to be delvered order ==========//

export const deliveredlOrder=async(req,res,next)=>{
     const {orderId}= req.params
    const{status}=req.body
     const order=await orderModel.findOne({_id:orderId})
    if(!order){
        return next(new Error('not founded that order check id ',{cause:404}))
    }else if(['wait payment','cancelled','rejected'].includes(order.status)){

        return next(new Error(`not I can\'t cansel order after changed to ${order.status}  ` ,{cause:404}))

             }    
            
    order.status=status
    order.save()
    res.status(201).json({message:`oreder status ${order.status}` })   

}
