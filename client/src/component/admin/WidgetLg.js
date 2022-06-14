import React from 'react'
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from "@material-ui/core";

const WidgetLg = () => {
    const { orders } = useSelector(state => state.order)

    return (
        <div className="widgetLg">
            <div style={{ display: "flex", justifyContent: 'space-around' }}>
                <h3 className="widgetLgTitle">Latest transactions</h3>
                <Link to='/dashboard/orders'>
                    <Button
                        id="createProductBtn"
                    >
                        Show all
                    </Button>
                </Link>
            </div>

            <table className="widgetLgTable">
                <tbody>
                    <tr className="widgetLgTr">
                        <th className="widgetLgTh">Customer</th>
                        <th className="widgetLgTh">Date</th>
                        <th className="widgetLgTh">Amount</th>
                        <th className="widgetLgTh">Status</th>
                    </tr>
                    {
                        orders.slice(0, 3).map(order => (
                            <tr className="widgetLgTr" key={order._id}>
                                <td className="widgetLgUser">
                                    <img
                                        src={order.user.avatar}
                                        alt=""
                                        className="widgetLgImg"
                                    />
                                    <span className="widgetLgName">{order.user.username}</span>
                                </td>
                                <td className="widgetLgDate"><Moment>{order.createdAt}</Moment></td>
                                <td className="widgetLgAmount">{order.totalPrice}</td>
                                <td className={
                                    order.orderStatus && order.orderStatus === "Done"
                                        ? "greenColor"
                                        : "redColor"
                                }>
                                    <span>{order.orderStatus}</span>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    );
}

export default WidgetLg