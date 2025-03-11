const router = require('express').Router()
const {userLogin} = require('../controller/login')

router.post('/userLogin', userLogin)

module.exports = router