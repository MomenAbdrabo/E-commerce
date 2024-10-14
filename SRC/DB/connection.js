import mongoose from "mongoose";

export const connectionDB = async () => {

  return await mongoose.connect(process.env.DB_CONNECTION)
    .then(result => { console.log("connection BataBase done ") })
    .catch(err => { console.log(`connection faild......${err} `) })

}