const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config({path: path.resolve('config.env')})

const app = express()
const routes = require('./routes')

app.set("view engine", "pug")
app.set("views", path.join(__dirname, "views"))
routes(app)
app.listen(process.env.port || 3000);