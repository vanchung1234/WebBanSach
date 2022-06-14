const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    ratings: {
        type: Number,
        default: 0,
    },
    images: {
        type: Array,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 1,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        { type: mongoose.Types.ObjectId, ref: 'review' }
    ],
    checked: {
        type: Boolean,
        default: false
    },
    user: { type: mongoose.Types.ObjectId, ref: 'user' }
}, {
    timestamps: true
})

productSchema.index({ name: 'text', category: 'text' })
module.exports = mongoose.model('product', productSchema)