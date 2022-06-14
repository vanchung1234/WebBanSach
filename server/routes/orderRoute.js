const express = require("express");
const orderCtrl = require('../controllers/orderCtrl')
const router = express.Router();
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
router.route("/order/new").post(auth, orderCtrl.createOrder);

router.route("/order/:id").get(orderCtrl.getSingleOrder);

router.route("/orders/me").get(auth, orderCtrl.myOrder);

router
    .route("/admin/orders")
    .get(orderCtrl.getAllOrders);

router
    .route("/admin/order/:id")
    .patch(orderCtrl.updateOrder)
    .delete(auth, orderCtrl.deleteOrder);

router.get("/stats/order", orderCtrl.getStats)
router.get("/income", orderCtrl.income)
router.patch('/auto/:id', orderCtrl.autoUpdate)

module.exports = router;