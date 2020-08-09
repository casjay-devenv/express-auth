const AuthenticationController = require('./../controllers/AuthenticationController')
const RegisterController = require('./../controllers/RegisterController')
// const authenticate = require('./middleware/authenticate')

module.exports = (app) => {
  app.post('/register',
    // authenticate.register,
    RegisterController.register)
  app.post('/login',
    AuthenticationController.login)
}
