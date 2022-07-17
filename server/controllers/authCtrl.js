const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authCtrl = {
    register: async (req, res) => {
        try {
            const { username, password, protectedCode } = req.body

            const user = await Users.findOne({ username })
            if (user) return res.status(400).json({ msg: "Tài khoản đã tồn tịa." })

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = new Users({
                username, password: passwordHash, protectedCode
            })


            const access_token = createAccessToken({ id: newUser._id })
            const refresh_token = createRefreshToken({ id: newUser._id })

            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 2 * 24 * 60 * 60 * 1000 // 30days
            })

            await newUser.save()

            res.json({
                msg: 'Đăng ký thành công!',
                access_token,
                user: {
                    ...newUser._doc,
                    password: '',
                    protectedCode: ''
                }
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async (req, res) => {
        try {
            const { username, password } = req.body

            const user = await Users.findOne({ username })
                .populate("avatar")

            if (!user) return res.status(400).json({ msg: "tên đăng nhập hoặc mật khẩu sai." })

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ msg: "tên đăng nhập hoặc mật khẩu sai." })

            const access_token = createAccessToken({ id: user._id })
            const refresh_token = createRefreshToken({ id: user._id })

            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 2 * 24 * 60 * 60 * 1000 // 30days
            })

            res.json({
                msg: 'Login Success!',
                access_token,
                user: {
                    ...user._doc,
                    password: ''
                }
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/api/refresh_token' })
            return res.json({ msg: "Logged out!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    refreshtoken: async (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if (!rf_token) return res.status(400).json({ msg: "Please login now." })

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, async (err, result) => {
                if (err) return res.status(400).json({ msg: "Please login now." })

                const user = await Users.findById(result.id).select("-password")
                    .populate('avatar username ')

                if (!user) return res.status(400).json({ msg: "This does not exist." })

                const access_token = createAccessToken({ id: result.id })

                res.json({
                    access_token,
                    user
                })
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}


const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '2d' })
}

module.exports = authCtrl