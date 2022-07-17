import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
const OrderSuccess = () => {
    return (
        <>

            <div className="orderSuccess">
                <CheckCircleIcon />

                <Typography>Đặt hàng thành công, cảm ơn quý khách đã tin tưởng Team2 Shop </Typography>
                <Link to="/Myorder">Xem đơn hàng</Link>
            </div>
        </>
    );
};

export default OrderSuccess;