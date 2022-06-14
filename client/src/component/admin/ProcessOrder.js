import React, { Fragment, useEffect, useState } from "react";
import Sidebar from './Sidebar'
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Moment from 'react-moment';
import { updateauto, updateOrder } from "../../redux/action/orderAction";
import { useDispatch } from "react-redux";
const ProcessOrder = ({ order }) => {
    const [orderStatus, setOrderStatus] = useState(order.orderStatus)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(updateauto(order))
    }, [dispatch])

    const select = [
        "Processing",
        "Shipped",
        "Done"
    ];

    const test = order.orderStatus


    const updateSubmit = (e) => {
        e.preventDefault();
        dispatch(updateOrder(orderStatus, order));
    };
    return (
        <Fragment>
            <div className='row' style={{ width: '100%', margin: '0px 0px', padding: '0' }}>
                <div className="sidebar col-lg-2 col-sm-2">
                    <Sidebar />
                </div>
                <div className=" col-lg-10 col-sm-10 newProductContainer" style={{ height: '90vh' }}>

                    <div
                        className="confirmOrderPage"
                        style={{
                            display: order.orderStatus === "Done" ? "block" : "grid",
                        }}
                    >
                        <div>
                            <div className="confirmshippingArea">
                                <Typography>Shipping Info</Typography>
                                <div className="orderDetailsContainerBox">
                                    <div>
                                        <p>Name:</p>
                                        <span>{order.user._id && order.user.username}</span>
                                    </div>
                                    <div>
                                        <p>Phone:</p>
                                        <span>
                                            {order.shippingInfo && order.shippingInfo.phone}
                                        </span>
                                    </div>
                                    <div>
                                        <p>Address:</p>
                                        <span>
                                            {order.shippingInfo &&
                                                `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.country}`}
                                        </span>
                                    </div>
                                    <div>
                                        <p>Phuong thuc thanh toan:</p>
                                        <span>
                                            {order.shippingInfo && order.shippingInfo.payment}
                                        </span>
                                    </div>
                                </div>

                                <Typography>Payment</Typography>
                                <div className="orderDetailsContainerBox">

                                    <div>
                                        <p>shippingPrice:</p>
                                        <span>{order.shippingPrice && order.shippingPrice}</span>
                                    </div>

                                    <div>
                                        <p>totalPrice:</p>
                                        <span>{order.totalPrice && order.totalPrice}</span>
                                    </div>

                                    <div>
                                        <p>amountPaid:</p>
                                        <span>{order.amountPaid && order.amountPaid}</span>
                                    </div>


                                    <div>
                                        <p>thoi gian tao:</p>
                                        <Moment>{order.createdAt && order.createdAt}</Moment>
                                    </div>

                                    <div>
                                        <p>thoi gian van chuyen:</p>
                                        <Moment>{order.deliveredAt && order.deliveredAt}</Moment>
                                    </div>

                                    <div>
                                        <p>thoi gian thanh toan:</p>
                                        <Moment>{order.paidAt && order.paidAt}</Moment>
                                    </div>
                                </div>

                                <Typography>Order Status</Typography>
                                <div className="orderDetailsContainerBox">
                                    <div style={{ flexDirection: 'column' }}>
                                        <p
                                            className={
                                                order.orderStatus && order.orderStatus === "Done"
                                                    ? "greenColor"
                                                    : "redColor"
                                            }
                                        >
                                            {order.orderStatus && order.orderStatus}
                                        </p>
                                        {
                                            order.orderStatus === "Done" || order.paymentID ?
                                                <p className="greenColor">DA THANH TOAN</p> :
                                                <p className="redColor">CHUA THANH TOAN</p>
                                        }
                                    </div>
                                </div>

                            </div>
                            <div className="confirmCartItems">
                                <Typography>Cart Items:</Typography>
                                <div className="confirmCartItemsContainer">
                                    {order.orderItems &&
                                        order.orderItems.map((item) => (
                                            <div key={item.product}>
                                                <img src={item.image} alt="Product" />
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>{" "}
                                                <span>
                                                    {item.quantity} X {item.price}$ ={" "}
                                                    <b>{item.price * item.quantity}$</b>
                                                </span>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                        {/*  */}
                        <div
                            style={{
                                display: order.orderStatus === "Done" ? "none" : "block",
                            }}
                        >
                            <form
                                className="updateOrderForm" onSubmit={updateSubmit}
                            >
                                <h1>Process Order</h1>

                                <div>
                                    <AccountTreeIcon />
                                    <select value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)}>
                                        <option value="" >{order.orderStatus}</option>
                                        {
                                            select.filter((item) => item !== test).map((role) => {
                                                return (
                                                    <option
                                                        value={role}
                                                        key={role}
                                                    >
                                                        {role}
                                                    </option>
                                                );
                                            })
                                        }

                                    </select>
                                </div>

                                <Button
                                    id="createProductBtn"
                                    type="submit"

                                >
                                    Process
                                </Button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>

        </Fragment>
    )
}

export default ProcessOrder