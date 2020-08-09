const _ = require('lodash')
const {User} = require('./../models/user')
// const jwt = require('jsonwebtoken')
// const config = require('./../config/config')
// const { ObjectID } = require('mongodb')
//

module.exports = {
  async login (req, res) {
    var body = _.pick(req.body, ['email', 'password'])

    User.findByCredentials(body.email, body.password).then((user) => {
      return user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user)
      })
    }).catch((e) => {
      res.status(403).send({
        error: 'Les informations de connexion sont incorrectes'
      })
    })
  }
}

// module.exports = {
//   async register (req, res) {
//     var body = _.pick(req.body, ['email', 'password'])
//     var user = new User(body) // first, create a new instance of the model
//
//     user.save().then(() => {
//       return user.generateAuthToken()
//     }).then((token) => {
//       res.header('x-auth', token).send(user) // if sign-up is ok, send authentication token to header
//     }).catch((e) => {
//       res.status(400).send(e)
//     })
//   },
// }
// POST /users
// app.post('/register', (req, res) => { // public route
//   var body = _.pick(req.body, ['email', 'password'])
//   var user = new User(body) // first, create a new instance of the model‡
//
//   user.save().then(() => {
//     return user.generateAuthToken()
//   }).then((token) => {
//     res.header('x-auth', token).send(user) // if sign-up is ok, send authentication token to header
//   }).catch((e) => {
//     res.status(400).send(e)
//   })
// })
//
// app.get('/users/me', authenticate, (req, res) => {
//   res.send(req.user)
// })
//
// app.post('/login', (req, res) => {
// var body = _.pick(req.body, ['email', 'password'])
//
// User.findByCredentials(body.email, body.password).then((user) => {
//   return user.generateAuthToken().then((token) => {
//     res.header('x-auth', token).send(user)
//   })
// }).catch((e) => {
//   res.status(400).send()
// })
// })
//
// app.delete('/users/me/token', authenticate, (req, res) => {
//   req.user.removeToken(req.token).then(() => {
//     res.status(200).send()
//   }, () => {
//     res.status(400).send()
//   })
// })

// app.post('/todos', authenticate, (req, res) => {
//   var todo = new Todo({
//     text: req.body.text,
//     _creator: req.user._id
//   })
//
//   todo.save().then((doc) => {
//     res.send(doc)
//   }, (e) => {
//     res.status(400).send(e)
//   })
// })
//
// app.get('/todos', authenticate, (req, res) => {
//   Todo.find({
//     _creator: req.user._id
//   }).then((todos) => {
//     res.send({ todos })
//   }, (e) => {
//     res.status(400).send(e)
//   })
// })
//
// app.get('/todos/:id', authenticate, (req, res) => {
//   var id = req.params.id
//
//   if (!ObjectID.isValid(id)) {
//     return res.status(404).send()
//   }
//
//   Todo.findOne({
//     _id: id,
//     _creator: req.user._id
//   }).then((todo) => {
//     if (!todo) {
//       return res.status(404).send()
//     }
//
//     res.send({ todo })
//   }).catch((e) => {
//     res.status(400).send()
//   })
// })
//
// app.delete('/todos/:id', authenticate, (req, res) => {
//   var id = req.params.id
//
//   if (!ObjectID.isValid(id)) {
//     return res.status(404).send()
//   }
//
//   Todo.findOneAndRemove({
//     _id: id,
//     _creator: req.user._id
//   }).then((todo) => {
//     if (!todo) {
//       return res.status(404).send()
//     }
//
//     res.send({ todo })
//   }).catch((e) => {
//     res.status(400).send()
//   })
// })
//
// app.patch('/todos/:id', authenticate, (req, res) => {
//   var id = req.params.id
//   var body = _.pick(req.body, ['text', 'completed'])
//
//   if (!ObjectID.isValid(id)) {
//     return res.status(404).send()
//   }
//
//   if (_.isBoolean(body.completed) && body.completed) {
//     body.completedAt = new Date().getTime()
//   } else {
//     body.completed = false
//     body.completedAt = null
//   }
//
//   Todo.findOneAndUpdate({ _id: id, _creator: req.user._id }, { $set: body }, { new: true }).then((todo) => {
//     if (!todo) {
//       return res.status(404).send()
//     }
//
//     res.send({ todo })
//   }).catch((e) => {
//     res.status(400).send()
//   })
// })
