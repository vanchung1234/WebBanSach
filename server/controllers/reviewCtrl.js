const Reviews = require('../models/reviewModel')
const Products = require('../models/productModel')

const reviewCtrl = {
    createReview: async (req, res) => {
        try {
            const { productId, rating, comment } = req.body

            const product = await Products.findById(productId)
                .populate("user", "avatar username ")
                .populate({
                    path: "reviews",
                    populate: {
                        path: "user",
                        select: "-password"
                    }
                })
            if (!product) return res.status(400).json({ msg: "This product does not exist." })

            const newReview = new Reviews({
                user: req.user._id, rating, comment, productId
            })


            product.reviews.push(newReview)
            product.numOfReviews = product.reviews.length;

            let avg = 0;

            product.reviews.forEach((rev) => {
                avg += rev.rating;
            });

            product.ratings = avg / product.reviews.length;

            const review = await Reviews.find({ productId, user: req.user._id })
            if (review.length > 0) return res.status(400).json({ msg: 'ban da review san pham nay r' })

            await product.save()
            await newReview.save()


            res.status(200).json({
                msg: 'review thanh cong',
                product,
                newReview,

            });

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }
}

module.exports = reviewCtrl

