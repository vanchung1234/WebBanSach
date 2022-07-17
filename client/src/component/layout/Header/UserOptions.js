import React, { Fragment, useState } from "react";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { logout } from '../../../redux/action/authAction'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserOptions = () => {
    const { auth } = useSelector((state) => state);
    const { cartItems } = useSelector((state) => state.cart);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const options = [
        { icon: <ListAltIcon />, name: "Đơn hàng", func: orders },
        { icon: <PersonIcon />, name: "Hồ sơ", func: account },
        {
            icon: (
                <ShoppingCartIcon
                    style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
                />
            ),
            name: `Giỏ hàng(${cartItems.length})`,
            func: cart,
        },
        { icon: <ExitToAppIcon />, name: "Đăng xuất", func: logoutUser },
    ];

    if (auth.user.role === "admin") {
        options.unshift({
            icon: <DashboardIcon />,
            name: "Dashboard",
            func: dashboard,
        });
    }

    function dashboard() {
        navigate("/dashboard");
    }

    function orders() {
        navigate("/Myorder");
    }
    function account() {
        navigate(`/profile/${auth.user._id}`);
    }
    function cart() {
        navigate("/cart");
    }
    function logoutUser() {
        dispatch(logout());
    }

    return (
        <Fragment>
            <Backdrop open={open} style={{ zIndex: "10" }} />
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                style={{ zIndex: "11" }}
                open={open}
                direction="down"
                className="speedDial"
                icon={
                    <img
                        className="speedDialIcon"
                        src={auth.user.avatar}
                        alt="Profile"
                    />
                }
            >
                {options.map((item) => (
                    <SpeedDialAction
                        key={item.name}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                        tooltipOpen={window.innerWidth <= 600 ? true : false}
                    />
                ))}
            </SpeedDial>
        </Fragment>
    );
};

export default UserOptions;