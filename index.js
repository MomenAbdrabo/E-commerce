import express from 'express'
import dotenv from 'dotenv'
import { initApp } from './SRC/initApp.js'
dotenv.config()

const app = express()
const port = process.env.PORT ||8000


initApp(app)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))