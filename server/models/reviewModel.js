const mongoose = require('mongoose')


const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'user' },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,

    },
    productId: mongoose.Types.ObjectId,

}, {
    timestamps: true

})

module.exports = mongoose.model('review', reviewSchema)