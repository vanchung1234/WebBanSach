import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeItemsFromCart } from "../redux/action/cartAction";
import CartItemCard from "../component/cart/CartItemCard";
import { useAlert } from "react-alert";
import BgImage from '../component/BgImage'

const Cart = () => {

    const alert = useAlert();

    const dispatch = useDispatch()
    const { cartItems } = useSelector((state) => state.cart);
    const navigate = useNavigate()
    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            alert.error("Het hang")
            return
        }
        dispatch(addToCart(id, newQty));
    };

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
            return;
        }
        dispatch(addToCart(id, newQty));
    };

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
    };

    const checkoutHandler = () => {
        navigate("/shipping");
    };
    return (
        <Fragment>
            <BgImage />
            {cartItems.length === 0 ? (
                <div className="emptyCart">
                    <RemoveShoppingCartIcon />

                    <Typography>Không có sản phẩm nào trong giỏ hàng</Typography>
                    <Link to="/products">Mua sắm ngay!</Link>
                </div>
            ) : (
                <Fragment>
                    <div className="cartPage">
                        <div className="cartHeader">
                            <p>Sản phẩm</p>
                            <p>Số lượng</p>
                            <p>Tiền sản phẩm</p>
                        </div>

                        {cartItems &&
                            cartItems.map((item) => (
                                <div className="cartContainer" key={item.product}>
                                    <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                                    <div className="cartInput">
                                        <button
                                            onClick={() =>
                                                decreaseQuantity(item.product, item.quantity)
                                            }
                                        >
                                            -
                                        </button>
                                        <input type="number" value={item.quantity} readOnly />
                                        <button
                                            onClick={() =>
                                                increaseQuantity(
                                                    item.product,
                                                    item.quantity,
                                                    item.stock
                                                )
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="cartSubtotal">{`${item.price * item.quantity
                                        }$`}</p>
                                </div>
                            ))}

                        <div className="cartGrossProfit">
                            <div></div>
                            <div className="cartGrossProfitBox">
                                <p>Tổng </p>
                                <p>{`${cartItems.reduce(
                                    (acc, item) => acc + item.quantity * item.price,
                                    0
                                )}$`}</p>
                            </div>
                            <div></div>
                            <div className="checkOutBtn">
                                <button style={{ height: '50px' }} onClick={checkoutHandler}>Đặt hàng</button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}

export default Cart