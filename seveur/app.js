require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const chalk = require('chalk')

//app
const app = express()
const http = require('http').createServer(app)

//import routes
const authRoutes = require('./routes/auth')
const pool = require('./db')
const error = require('./controllers/error')

//middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())

//routes middlewares
app.use('/api', authRoutes)

const port = process.env.PORT || 9000

http.listen(port, () => {
  console.log(chalk.blue(`App listen on port ${port}`))
})
