const router = require('express').Router()
const {bulkCreateMovies, getMovies, getProject, manager} = require('../controller/movies')

router.post('/create', bulkCreateMovies)
router.get('/get', getMovies)
router.get('/project', getProject)
router.get('/manager', manager)

module.exports = router