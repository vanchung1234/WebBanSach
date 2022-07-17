const Orders = require('../models/orderModel')
const Products = require('../models/productModel')

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


async function updateStock(id, quantity) {
    const product = await Products.findById(id);

    product.stock -= quantity;

    await product.save({ validateBeforeSave: false });
}

const orderCtrl = {
    createOrder: async (req, res) => {
        try {
            const {
                shippingInfo,
                orderItems,
                itemsPrice,
                shippingPrice,
                totalPrice,
                paymentID,
            } = req.body;

            const newOrder = new Orders({
                shippingInfo,
                orderItems,
                itemsPrice,
                shippingPrice,
                totalPrice,
                paymentID,
                deliveredAt: null,
                paidAt: null,
                user: req.user._id,
            })

            newOrder.save()
            res.json({
                msg: "Tạo đơn hàng thành công",
                newOrder: {
                    ...newOrder._doc,
                    user: req.user
                }
            })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    getSingleOrder: async (req, res) => {
        try {
            const order = await Orders.findById(req.params.id)
                .populate("user", " username avatar ")

            if (!order) return res.status(400).json('K tim thay order')

            res.status(200).json({
                success: true,
                order,
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message })

        }
    },
    // get logged in user  Orders
    myOrder: async (req, res) => {
        try {
            const features = new APIfeatures(Orders.find({ user: req.user._id }), req.query).sorting()

            const orders = await features.query.sort('-createdAt').populate("user", "username avatar");
            res.status(200).json({
                orders,
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message })

        }
    },
    // get all Orders -- Admin
    getAllOrders: async (req, res) => {
        try {
            const features = new APIfeatures(Orders.find(), req.query).sorting()

            const orders = await features.query.sort('-createdAt').populate("user", "username avatar");


            let totalAmount = 0;

            orders.forEach((order) => {
                totalAmount += order.totalPrice;
            });

            res.status(200).json({
                totalAmount,
                orders,
            });

        } catch (error) {
            return res.status(500).json({ msg: error.message })

        }

    },

    //update Order Status 
    updateOrder: async (req, res) => {
        try {
            const order = await Orders.findById(req.params.id).populate("user", "username avatar");

            if (!order) {
                return res.status(400).json({ msg: "Không tìm thấy đơn hàng" });
            }

            const { orderStatus } = req.body

            order.orderStatus = orderStatus;

            if (orderStatus === "Shipped") {
                order.deliveredAt = Date.now();
            }

            if (orderStatus === "Done") {
                order.orderItems.forEach(async (o) => {
                    await updateStock(o.product, o.quantity);
                });
                order.paidAt = Date.now();
                order.amountPaid += order.totalPrice
            }

            await order.save()
            res.json({
                msg: "Cập nhật trạng thái đơn hàng!",
                newOrder: {
                    ...order._doc,
                    orderStatus
                }
            })
        } catch (error) {
            return res.status(500).json({ msg: error.message })

        }

    },

    deleteOrder: async (req, res) => {
        try {
            const order = await Orders.findById(req.params.id);
            if (!order) {
                return res.status(400).json({ msg: "Không tìm thấy đơn hàng" });
            }
            await order.remove();

            res.status(200).json({
                msg: 'Xóa đơn hàng thành công'
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message })

        }
    },
    getStats: async (req, res) => {
        const date = new Date();
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

        try {
            const income = await Orders.aggregate([

                {
                    $project: {
                        month: { $month: "$createdAt" },
                        sales: "$totalPrice",
                    },
                },
                {
                    $group: {
                        _id: "$month",
                        total: { $sum: "$sales" },
                    },
                },
            ]);
            res.status(200).json(income);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    income: async (req, res) => {
        const date = new Date();
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

        try {
            const income = await Orders.aggregate([
                {
                    $match: {
                        createdAt: { $gte: previousMonth },

                    },
                },
                {
                    $project: {
                        month: { $month: "$createdAt" },
                        sales: "$amountPaid",
                    },
                },
                {
                    $group: {
                        _id: "$month",
                        total: { $sum: "$sales" },
                    },
                },
            ]);
            res.status(200).json(income);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    autoUpdate: async (req, res) => {
        try {
            const order = await Orders.findById(req.params.id).populate("user", "username avatar");

            if (!order) {
                return res.status(400).json({ msg: "Order not found with this Id" });
            }

            if (order.paymentID) {
                order.paidAt = Date.now();
                order.amountPaid += order.totalPrice
            }

            await order.save()
            res.json({

                newOrder: {
                    ...order._doc,

                }
            })
        } catch (error) {
            return res.status(500).json({ msg: error.message })

        }
    },
}

module.exports = orderCtrl