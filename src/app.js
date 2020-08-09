require('./../config/config')

// const _ = require('lodash')
// const { ObjectID } = require('mongodb')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
require('./../db/mongoose')
// var { mongoose } = require('./../db/mongoose')
// var { Todo } = require('./../models/todo')
// var { User } = require('./../models/user')
// var { authenticate } = require('./../middleware/authenticate')

var app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const port = process.env.PORT

require('./routes')(app)

app.listen(port, () => {
  console.log(`Started up at port ${port}`)
})

module.exports = { app }
