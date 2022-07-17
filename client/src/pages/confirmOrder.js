import React, { Fragment, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from '../component/cart/CheckoutSteps';
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { createOrder } from "../redux/action/orderAction";
import PaypalButton from "../component/cart/PaypalButton";
import BgImage from '../component/BgImage'

const ConfirmOrder = () => {

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { auth } = useSelector(state => state)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );



  const shippingCharges = subtotal > 100 ? 0 : 1;

  const totalPrice = subtotal + shippingCharges;

  const addresss = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.country}`;

  const tranSuccess = async (payment) => {
    const { paymentID } = payment
    const data = {
      subtotal,
      shippingCharges,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    const order = {
      shippingInfo,
      orderItems: cartItems,
      itemsPrice: subtotal,
      shippingPrice: shippingCharges,
      totalPrice,
      paymentID
    }
    dispatch(createOrder(order, auth))
    navigate("/success");

  }

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    const order = {
      shippingInfo,
      orderItems: cartItems,
      itemsPrice: subtotal,
      shippingPrice: shippingCharges,
      totalPrice
    }
    dispatch(createOrder(order, auth))
    navigate("/success");
  };
  return (
    <Fragment>
      <BgImage />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Thông tin giao hàng</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Tên:</p>
                <span>{auth.user.username}</span>
              </div>
              <div>
                <p>Số điện thoại:</p>
                <span>{shippingInfo.phone}</span>
              </div>
              <div>
                <p>Địa chỉ:</p>
                <span>{addresss}</span>
              </div>
              <div>
                <p>Phương thức thanh toán:</p>
                <span>{shippingInfo.payment}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Sản phẩm đặt hàng:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X {item.price}$ =
                      <b>{item.price * item.quantity}$</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Thanh toán</Typography>
            <div>
              <div>
                <p>Tổng tiền sản phẩm:</p>
                <span>{subtotal}$</span>
              </div>
              <div>
                <p>Tiền giao hàng:</p>
                <span>{shippingCharges}$</span>
              </div>

            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Tổng thanh toán:</b>
              </p>
              <span>{totalPrice}$</span>
            </div>
            {
              shippingInfo.payment === "Thanh toán tiền mặt" ? <button style={{ height: '50px' }} onClick={proceedToPayment} >Tiếp tục thanh toán</button>
                : <PaypalButton total={totalPrice}
                  tranSuccess={tranSuccess} onClick={proceedToPayment}></PaypalButton>

            }


          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ConfirmOrder