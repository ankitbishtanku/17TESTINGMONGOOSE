const router = require('express').Router();
const {createCareer, getCareer, updateCareer} = require('../controller/career')
const {payload} = require('./middleware');

router.post('/create', payload('career'), createCareer)
router.get('/get/:id', getCareer)
router.put('/update/:id', updateCareer)

module.exports = router