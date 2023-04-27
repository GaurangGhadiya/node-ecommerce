const { Router } = require('express')
const userRouter = require('./user')

const router = Router()

// router.post('/', validation?.signUp, authenticationController?.signUp)
router.use('/user', userRouter)

module.exports = router