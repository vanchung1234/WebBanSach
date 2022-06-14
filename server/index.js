require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

const URI = process.env.MONGODB_URL
mongoose.connect(URI, {

    useUnifiedTopology: true,
    useNewUrlParser: true,

}, err => {
    if (err) throw err;
    console.log('Connected to MongoDB')
})


app.use('/api', require('./routes/authRouter'))
app.use('/api', require('./routes/userRouter'))
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/productRouter'))
app.use('/api', require('./routes/orderRoute'))
app.use('/api', require('./routes/reviewRouter'))



const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})
