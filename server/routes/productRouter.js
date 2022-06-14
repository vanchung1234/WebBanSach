const router = require('express').Router()
const productCtrl = require('../controllers/productCtrl')
const auth = require('../middleware/auth')

router.route('/products')
    .post(productCtrl.createProduct)
    .get(productCtrl.getProducts)

router.get(('/allproduct'), productCtrl.getAllProducts)

router.route('/products/:id')
    .patch(auth, productCtrl.updateProduct)
    .get(productCtrl.getProduct)
    .delete(productCtrl.deleteProduct)

router.route('/generic/:id')
    .get(productCtrl.genericProducts)


module.exports = router