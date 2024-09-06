import express from 'express'
import { initApp } from './SRC/initApp.js'
import dotenv from 'dotenv'
import chalk from 'chalk'
dotenv.config()

const app = express()
const port =process.env.PORT||3000


initApp(app,express)


app.listen(port, () => console.log(chalk.blue(`Example app listening on port ${port}!`)))