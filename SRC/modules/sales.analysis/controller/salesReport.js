import { calculateSalesForAnyPeriod, getOrdersForAnyPeriod } from "../../../utils/salesAnalysisHelpers.js"




export const getTodaySales=async(req,res,next)=>{

    const date=Date.now()
    const total = await calculateSalesForAnyPeriod({ startPeriod: date})
    const data = await getOrdersForAnyPeriod({ startPeriod: date })
    return res.status(200).json({ 
        totalTodaySales :total,
        orders: data

    })

} 

export const getAnyPeriodSales=async(req,res,next)=>{
    const {startPeriod,endPeriod}=req.body

    const total = await calculateSalesForAnyPeriod({ startPeriod,endPeriod })
    const data = await getOrdersForAnyPeriod({ startPeriod, endPeriod })

    return res.status(200).json({ 
        totalSales :total,
        orders:data
    })

} 