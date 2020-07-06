const express = require('express')
const router = express.Router()
const { verifyToken } = require('../controllers/verifyToken')
const { isAuthenticated } = require('../controllers/scraper')

router.post('/isAuthenticated', verifyToken, isAuthenticated)

// router.get('/searchMovie/:title', verifyToken, searchMovies)

// router.get('/movie/:imdbID', verifyToken, getMovie)

module.exports = router
