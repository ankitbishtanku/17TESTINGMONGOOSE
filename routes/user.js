const router = require('express').Router();
const {createUser, getUser, addFileld} = require('../controller/User')

router.post('/new', createUser);
router.get('/getUser/:_id', getUser)
router.get('/addFileld', addFileld)

module.exports = router