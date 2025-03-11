const router = require('express').Router();
const {createMessage, getMessages, updateMessages} = require('../controller/message.js')

router.post('/create', createMessage)
router.get('/get/:id', getMessages)
router.put('/update/:id', updateMessages)

module.exports = router