import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import BgImage from '../component/BgImage'

const OrderSuccess = () => {
    return (
        <>
            <BgImage />
            <div className="orderSuccess">
                <CheckCircleIcon />

                <Typography>Đặt hàng thành công, cảm ơn quý khách đã tin tưởng Team2 Shop </Typography>
                <Link to="/Myorder">Xem đơn hàng</Link>
            </div>
        </>
    );
};

export default OrderSuccess;