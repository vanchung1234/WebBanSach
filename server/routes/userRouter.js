const router = require('express').Router()
const auth = require("../middleware/auth")
const userCtrl = require("../controllers/userCtrl")

router.post('/user/forgotPassword', userCtrl.forgotPassword)

router.patch('/user/password', auth, userCtrl.updatePassword)

router.patch('/user/profile', auth, userCtrl.updateUserProfile)

router.patch('/admin/user/:id', userCtrl.updateUser)

router.get('/admin/user/:id', userCtrl.getUser)

router.get('/admin/user', userCtrl.getAllUser)

router.delete('/admin/user/:id', userCtrl.deleteUser)


router.get("/stats", userCtrl.getstats)
module.exports = router