const router = require('express').Router();
const user = require('./user.js')
const message = require('./message.js')
const career = require('./career')
const movies = require('./movies')
const dateQuery = require('./dateQuery')
const login = require('./login')
const middleware = require('../middleware/loginMiddleWare')

router.use('/user', user)
router.use('/message', middleware.userLoginMiddleware, message)
router.use('/career', middleware.userLoginMiddleware, career)
router.use('/movies', middleware.userLoginMiddleware, movies)
router.use('/dateQuery', dateQuery)
router.use('/login', login)

module.exports = router