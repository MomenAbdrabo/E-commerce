import { orderModel } from "../DB/models/order.model.js"





export async function calculateSalesForAnyPeriod({ startPeriod, endPeriod = Date.now() }) {

    const start = new Date(startPeriod)
    start.setHours(0, 0, 0, 0)

    const end = new Date(endPeriod)
    end.setHours(23, 59, 59, 999)

  const total=  await orderModel.aggregate([
   
        {
            $match: {
                status: {
                    $nin: ['cancelled', 'rejected', 'wait payment']
                },
                createdAt: {
                    $gte:start,
                    $lte: end
                }
            }
        },
        {
            $group: {
                _id:null,
                totalOrderValue: { $sum:"$finalPrice" }
            }
        }
    ])
    
    return total.length>0 ? total[0].totalOrderValue : 0;

}

export async function getOrdersForAnyPeriod({ startPeriod, endPeriod = Date.now() }) {

    const start = new Date(startPeriod)
    start.setHours(0, 0, 0, 0)

    const end = new Date(endPeriod)
    end.setHours(23, 59, 59, 999)

    const data = await orderModel.aggregate([
        {
            $match: {
                status: {
                    $nin: ['cancelled', 'rejected', 'wait payment']
                },
                createdAt: {
                    $gte: start,
                    $lte: end
                }
            }
        }])

        return data.length>0 ? data : 0
    
}