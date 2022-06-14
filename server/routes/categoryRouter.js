const router = require('express').Router()
const categoryCtrl = require('../controllers/categoryCtrl')
const auth = require('../middleware/auth')

router.route('/categories')
    .post(auth, categoryCtrl.createCategory)
    .get(categoryCtrl.getCategories)

router.route('/category/:id')
    .patch(auth, categoryCtrl.updateCategory)
    .delete(auth, categoryCtrl.deleteCategory)

module.exports = router