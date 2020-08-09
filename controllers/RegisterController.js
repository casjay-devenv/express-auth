const Joi = require('joi')
const _ = require('lodash')
const {User} = require('./../models/user')
const jwt = require('jsonwebtoken')
// const config = require('./../config/config')

module.exports = {
  async register (req, res, next) {
    //First get the email and password value send by the client
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{6,32}$')
      )
    }

    //Then check if they are valide with joi
    const {error} = Joi.validate(req.body, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'Vous devez entrez une adresse email valide'
          })
          break
        case 'password':
          res.status(400).send({
            error: `Le mot de passe fourni ne correspond pas aux règles suivantes:
              <br>
              1. Il doit contenir UNIQUEMENT les caractères suivants: minuscule, majuscule, numérique.
              <br>
              2. Il doit comporter entre 6 et 32 caractères.`
          })
          break
        default:
          res.status(400).send({
            error: 'Informations d\'enregistrement invalides'
          })
      }
    } else {
      // next()
      //If they are, save the new user to the database and send the user data back (id and email)
      var body = _.pick(req.body, ['email', 'password'])
      var user = new User(body) // first, create a new instance of the model‡

      user.save().then(() => {
        return user.generateAuthToken()
      }).then((token) => {
        res.header('x-auth', token).send(user) // if sign-up is ok, send authentication token to header
      }).catch((e) => {
        if (e.code == 11000) {
          res.status(400).send({
            error: 'Cette adresse email est déjà enregistrée'
          })
        } else {
          res.status(400).send(e)
        }
      })
    }
  }
}
