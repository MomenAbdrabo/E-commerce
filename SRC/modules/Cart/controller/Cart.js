import mongoose from "mongoose"
import { cartModel } from "../../../DB/models/cart.model.js"
import { productModel } from "../../../DB/models/product.model.js"
import * as cache from "../../../utils/cacheManager.js"

export const cart = async (req, res, next) => {

    const cartFromCache = await cache.getDataFromCache({ key: req.user._id })

    if (cartFromCache != null) {
        const data = JSON.parse(cartFromCache)
        return res.status(200).json({ cart: new cartModel(data) })
    }
    const cart = await cartModel.findOne({ userId: req.user._id })
    await cache.setValueOnCache({ key: req.user._id, value: cart })
    return res.status(200).json({ cart })
}

export const createCart = async (req, res, next) => {

    const { quantity, productId } = req.body

    const product = await productModel.findById(productId)
    if (!product) {
        return next(new Error('in-valid Product ID', { cause: 400 }))
    }
    if (product.stock < quantity || product.isDeleted) {
        if (!product.washUserList.length) {
            product.washUserList.push(req.user._id)
            await product.save();
        }

        if (!product.washUserList.includes(req.user._id)) {
            product.washUserList.push(req.user._id)
            await product.save();
        }


        return next(new Error(`max quantity available ${product.stock || 0}`, { cause: 400 }))
    }

    const cart = await cartModel.findOne({ userId: req.user._id })
    //In case there was no cart before
    if (!cart) {
        await cartModel.create({
            userId: req.user._id,
            product: [{
                productId,
                quantity,
            }]
        })
        return res.status(200).json({ message: 'product added to cart in case1 ' })
    }
    // ف حالة انه المنتج كان موجود اصلا ف الكارت 
    for (let index = 0; index < cart.product.length; index++) {

        if (cart.product[index].productId == productId) {
            cart.product[index].quantity = quantity
            await cart.save()
            return res.status(200).json({ message: 'product added to cart in case2 ' })
        }
    }
    cart.product.push(req.body)
    await cart.save()
    return res.status(200).json({ message: 'product added to cart in case3 ' })

    //   const userProductInCart=await cartModel.findOne({userId:req.user._id,product:productId}).select('product')
    // console.log(userProductInCart);

    //   if(userProductInCart){

    //    // console.log(userProductInCart);

    //     userProductInCart.product[0].quantity=quantity
    //    await userProductInCart.save()
    //     return res.status(200).json({message:'product added to cart in case2 '})
    // }

    // cart.product.push(req.body)
    // await cart.save()
    // return res.status(200).json({message:'product added to cart in case3 '})
}


//================= deleteItem from cart ==============//

export async function emptyCart(userId) {

    const checkDelete = await cartModel.updateOne({ userId }, { product: [] }, { new: true })
    return checkDelete
}

export async function deleteItemFromCart(userId, productIds) {

    const checkDelete = await cartModel.updateOne({ userId },
        {
            $pull: {
                product:
                {
                    productId: { $in: productIds }
                }
            }
        })

    return checkDelete
}

export const deleteItem = async (req, res, next) => {
    const { productIds } = req.body

    const cart = await deleteItemFromCart(req.user._id, productIds)

    return cart.modifiedCount ? res.status(200).json({ message: 'done', cart })
        : res.status(400).json({ message: 'faild update' })
}
export const clearCart = async (req, res, next) => {

    const cart = await emptyCart(req.user._id)

    return cart.modifiedCount ? res.status(200).json({ message: 'done', cart })
        : res.status(400).json({ message: 'faild update' })
}