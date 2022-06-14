const router = require('express').Router()
const reviewCtrl = require('../controllers/reviewCtrl')

const auth = require('../middleware/auth')

router.post('/review', auth, reviewCtrl.createReview)

module.exports = router