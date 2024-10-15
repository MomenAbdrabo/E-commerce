import schedule from 'node-schedule'
import { userModel } from '../DB/models/user.model.js'



export function removeUnverifiedEmails() {
    schedule.scheduleJob(' 1 6 15 * *', async function () {
        const user = await userModel.find({ confirmEmail: false, createdAt: { $lte: Date.now() - 15 * 24 * 60 * 60 * 1000 } })
        const userId = user.map((user) => { return user._id })
        await userModel.deleteMany({_id:{$in:userId}})
    })
}