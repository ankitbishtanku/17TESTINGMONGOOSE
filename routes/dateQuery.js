const router = require('express').Router()
const {addDateQuery, bulkCreateDateQuery, getData} = require('../controller/dateQuery')

router.post('/create', addDateQuery)
router.post('/bulkCreate', bulkCreateDateQuery)
router.get('/get', getData)

module.exports = router