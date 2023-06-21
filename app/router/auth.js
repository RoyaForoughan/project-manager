const { AuthController } = require('../http/controllers/auth.controller')
const { registerValidator, loginValidator } = require('../http/validations/auth')
const { expressValidatorMapper } = require('../http/middlewares/checkErrors')

const router = require('express').Router()

router.post('/register', registerValidator(), expressValidatorMapper, AuthController.register)
router.post('/login', loginValidator(), expressValidatorMapper, AuthController.login)
module.exports = {
    authRoutes : router
}