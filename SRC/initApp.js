import express from 'express'
import { connectionDB } from './DB/connection.js'
import { authRouter } from './modules/auth/auth.router.js'
import { brandRouter } from './modules/Brand/Brand.router.js'
import { cartRouter } from './modules/Cart/Cart.router.js'
import { categorRouter } from './modules/Category/category.router.js'
import { couponRouter } from './modules/Coupon/coupon.router.js'
import { orderRouter } from './modules/Order/order.router.js'
import { productRouter } from './modules/Product/product.router.js'
import { userRouter } from './modules/User/user.router.js'
import { globalErrorHandling } from './utlis/errorHandling.js'
import morgan from 'morgan'
import cors from 'cors'
import { limiter } from './middleware/rateLimit.js'


export const initApp = (app) => {

    //     let whitelist = ['http://example1.com', 'http://example2.com']
    //         let corsOptions = {
    //         origin: function (origin, callback) {
    //             if (whitelist.indexOf(origin) !== -1) {
    //             callback(null, true)
    //             } else {
    //             callback(new Error('Not allowed by CORS'))
    //             }
    //         }
    // }

    app.use(cors({}))

    app.use((req, res, next) => {

        if (req.originalUrl == '/order/webhook') {
            next()
        } else {
            express.json({})(req, res, next)
        }
    })

    app.use(limiter)
    app.use(morgan('dev'))

    app.get('/', (req, res) => {
        res.send('Welcome to the API, Please read the Postman documentation');
    });
    app.use('/auth', authRouter)
    app.use('/coupon', couponRouter)
    app.use('/category', categorRouter)
    app.use('/brand', brandRouter)
    app.use('/user', userRouter)
    app.use('/product', productRouter)
    app.use('/cart', cartRouter)
    app.use('/order', orderRouter)
    app.use(express.static('public'));
    app.all('*', (req, res, next) => {
        return next(new Error(`route not found:${req.originalUrl}`, { cause: 404 }))
    })
    app.use(globalErrorHandling)
    connectionDB()
}