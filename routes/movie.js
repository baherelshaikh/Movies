const express = require('express')
const router = express.Router()
const {
    getAllMovies,
    getSingleMovie,
    displayMovie,
} = require('../controllers/Movie.js')



router
  .route('/all/:divisionName')
  .get(getAllMovies)

router
  .route('/:id')
  .get(getSingleMovie)

router
  .route('/displayMovie/:id')
  .get(displayMovie)


module.exports = router
