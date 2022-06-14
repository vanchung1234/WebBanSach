const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }
}

const userCtrl = {
    forgotPassword: async (req, res) => {
        try {
            const { username, protectedCode, password } = req.body

            const user = await Users.findOne({ username })
            if (!user)
                return res.status(400).json({ msg: "Sai ten tai khoan hoac ma bao ve" })

            const protected_code = await Users.findOne({ protectedCode })
            if (!protected_code)
                return res.status(400).json({ msg: "Sai ten tai khoan hoac ma bao ve" })

            const passwordHash = await bcrypt.hash(password, 10)

            await Users.findOneAndUpdate({ username, protected_code }, {
                password: passwordHash
            })

            return res.json({ msg: "lap lai mat khau thanh cong" })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    updateUserProfile: async (req, res) => {
        try {
            const { avatar, username } = req.body

            await Users.findOneAndUpdate({ _id: req.user._id }, {
                avatar, username
            })

            res.json({ msg: "Update Success!" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updatePassword: async (req, res) => {
        try {
            const { oldPassword, password, cfpassword } = req.body
            const user = await Users.findOne({ user: req.userId })
            const isMatch = await bcrypt.compare(oldPassword, user.password)
            if (!isMatch) return res.status(400).json({ msg: "mat khau cu sai" })
            if (oldPassword === password) return res.status(400).json({ msg: "pass trung voi oldpassword" })
            if (password !== cfpassword) return res.status(400).json({ msg: "cfpassword khong dung" })

            const passwordHash = await bcrypt.hash(password, 10)
            user.password = passwordHash
            await user.save()
            res.json({ msg: "Update Success!" });
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    //Admin
    getAllUser: async (req, res) => {
        try {
            const features = new APIfeatures(Users.find({
            }), req.query)

            const users = await features.query.sort('-createdAt')

            res.json({
                msg: 'success',
                result: users.length,
                users
            })
        } catch (error) {
            return res.status(500).json({ msg: error.message })

        }
    },
    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.params.id).select('-password')

            if (!user) return res.status(400).json({ msg: "User does not exist." })

            res.json({ user })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateUser: async (req, res) => {
        try {
            const { role } = req.body

            const user = await Users.findOneAndUpdate({ _id: req.params.id }, {
                role
            })

            res.json({
                msg: "Updated User!",
                newUser: {
                    ...user._doc,
                    role
                }
            })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    deleteUser: async (req, res) => {
        try {
            const users = await Users.findOneAndDelete({ _id: req.params.id })
            res.json({
                msg: 'Deleted User!',
                newUser: {
                    ...users,
                }
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getstats: async (req, res) => {
        const today = new Date();
        const latYear = today.setFullYear(today.setFullYear() - 1);

        try {
            const data = await Users.aggregate([
                {
                    $project: {
                        month: { $month: "$createdAt" },
                    },
                },
                {
                    $group: {
                        _id: "$month",
                        total: { $sum: 1 },
                    },
                },
            ]);
            res.status(200).json(data)
        } catch (err) {
            res.status(500).json(err);
        }
    }

}

module.exports = userCtrl