const Category = require('../models/categoryModel')

const categoryCtrl = {
    createCategory: async (req, res) => {
        try {
            const { name } = req.body

            const category = await Category.findOne({ name })
            if (category)
                return res.status(400).json({ msg: "Danh mục đã tồn tại" })

            const newCategory = new Category({
                name, user: req.userId
            })
            await newCategory.save()

            res.json({
                msg: 'Tạo danh mục thành công!',
                newCategory: {
                    ...newCategory._doc,
                    user: req.user
                }
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getCategories: async (req, res) => {
        try {
            const categories = await Category.find({})

            res.json({
                msg: 'Success!',
                result: categories.length,
                categories
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { name } = req.body

            const category = await Category.findOneAndUpdate({ _id: req.params.id }, {
                name
            })
            res.json({
                msg: "Cập nhật danh mục thành công!",
                newCategory: {
                    ...category._doc,
                    name
                }
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const category = await Category.findOneAndDelete({ id: req.params.id, user: req.userId })

            res.json({
                msg: 'Xóa danh mục thành công!',
                newCategory: {
                    ...category,
                    user: req.user
                }
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}

module.exports = categoryCtrl
