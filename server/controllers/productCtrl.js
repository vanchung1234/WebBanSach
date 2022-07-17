const Products = require('../models/productModel')
const Reviews = require('../models/reviewModel')
class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering() {
        const queryObj = { ...this.queryString } //queryString = req.query

        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete (queryObj[el]))

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

        //    gte = greater than or equal
        //    lte = lesser than or equal
        //    lt = lesser than
        //    gt = greater than
        this.query.find(JSON.parse(queryStr))

        return this;
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

    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 6
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const productCtrl = {
    getProducts: async (req, res) => {
        try {
            const features = new APIfeatures(Products.find(), req.query)
                .filtering().paginating().sorting()

            const result = await Promise.allSettled([
                features.query.sort('-createdAt')
                    .populate("user", "avatar username ")
                    .populate({
                        path: "reviews", options: { sort: { 'createdAt': -1 } },
                        populate: {
                            path: "user",
                            select: "-password"
                        }
                    }),

                Products.countDocuments() //count number of products.
            ])

            const products = result[0].status === 'fulfilled' ? result[0].value : [];
            const count = result[1].status === 'fulfilled' ? result[1].value : 0;

            res.json({
                status: 'success',
                result: products.length,
                products: products,
                count
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getAllProducts: async (req, res) => {
        try {
            const features = new APIfeatures(Products.find(), req.query)
                .sorting()
            const products = await features.query.sort('-createdAt')

            res.json({
                result: products.length,
                products
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    genericProducts: async (req, res) => {
        try {
            const features = new APIfeatures(Products.find({ _id: { $ne: req.params.id } }
            ), req.query).filtering()

            const products = await features.query.sort('-createdAt')

            res.json({
                status: 'success',
                result: products.length,
                products
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    createProduct: async (req, res) => {
        try {
            const { name, description, price, stock, category, images } = req.body

            // if (images.length === 0)
            //     return res.status(400).json({ msg: "Please add your photo." })

            const newProduct = new Products({
                name, description, price, stock, category, images, user: req.userId
            })

            await newProduct.save()

            res.json({
                msg: "Tạo sản phẩm!",
                newProduct: {
                    ...newProduct._doc,
                    user: req.user
                }
            })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { name, description, price, stock, category, images } = req.body

            const product = await Products.findOneAndUpdate({ _id: req.params.id }, {
                name, description, price, stock, category, images
            }).populate("user", "avatar username ")
                .populate({
                    path: "reviews",
                    populate: {
                        path: "user",
                        select: "-password"
                    }
                })


            res.json({
                msg: "Cập nhật sản phẩm!",
                newProduct: {
                    ...product._doc,
                    name, description, price, stock, category, images
                }
            })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const product = await Products.findOneAndDelete({ _id: req.params.id, user: req.userId })
            await Reviews.deleteMany({ _id: product.reviews })
            res.json({
                msg: 'Xóa sản phẩm!',
                newProduct: {
                    ...product,
                    user: req.user
                }
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getProduct: async (req, res) => {
        try {
            const product = await Products.findById(req.params.id)
                .populate("user", "avatar username ")
                .populate({
                    path: "reviews",
                    populate: {
                        path: "user",
                        select: "-password"
                    }
                })

            if (!product) return res.status(400).json({ msg: 'This product does not exist.' })

            res.json({
                product
            })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }

    }

}

module.exports = productCtrl