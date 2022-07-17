import axios from 'axios'
import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../component/cart/CheckoutSteps';
import { saveShippingInfo } from '../redux/action/cartAction';
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import { Country, State } from "country-state-city";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { useAlert } from "react-alert";
import BgImage from '../component/BgImage'

const Shipping = () => {
    const dispatch = useDispatch()
    const payments = [
        'Thanh toán tiền mặt',
        'Thanh toán online'
    ]
    const { shippingInfo } = useSelector((state) => state.cart);
    const [city, setCity] = useState(shippingInfo.city)
    const [phone, setPhone] = useState(shippingInfo.phone);
    const [address, setAddress] = useState(shippingInfo.address);
    const [country, setCountry] = useState(shippingInfo.country);
    const [payment, setPayment] = useState(shippingInfo.payment)
    const navigate = useNavigate()
    const alert = useAlert()

    const shippingSubmit = (e) => {
        e.preventDefault();

        if (phone.length < 10 || phone.length > 10) {
            alert.error("Định dạng số điện thoại không đúng");
            return;
        }
        dispatch(
            saveShippingInfo({ address, city, country, phone, payment })
        );
        navigate("/confirmOrder");
    };

    return (
        <Fragment>
            <BgImage />
            <CheckoutSteps activeStep={0} />

            <div className="shippingContainer">
                <div className="shippingBox">
                    <h2 className="shippingHeading">Thông tin giao hàng</h2>

                    <form
                        className="shippingForm"
                        encType="multipart/form-data"
                        onSubmit={shippingSubmit}
                    >

                        <div>
                            <PublicIcon />

                            <select
                                required
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="">Quốc gia</option>
                                {Country &&
                                    Country.getAllCountries().map((item) => (
                                        <option key={item.isoCode} value={item.isoCode}>
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                        </div>


                        <div>
                            <LocationCityIcon />

                            <select
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            >
                                <option value="">Thành phố</option>
                                {State &&
                                    State.getStatesOfCountry(country).map((item) => (
                                        <option key={item.isoCode} value={item.isoCode}>
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                        </div>


                        <div>
                            <HomeIcon />
                            <input
                                type="text"
                                placeholder="Địa chỉ"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        <div>
                            <PhoneIcon />
                            <input
                                type="number"
                                placeholder="Số điện thoại"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                size="10"
                            />
                        </div>

                        <div>
                            <TransferWithinAStationIcon />

                            <select
                                required
                                value={payment}
                                onChange={(e) => setPayment(e.target.value)}
                            >
                                <option value="">Phương thức thanh toán</option>
                                {
                                    payments.map((payment) => (
                                        <option key={payment} value={payment}>
                                            {payment}
                                        </option>
                                    ))}
                            </select>
                        </div>


                        {/* <div>
                            <LocationCityIcon />

                            <select
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            >
                                <option value="">City</option>
                                {
                                    data.map((item) => (
                                        <option key={item.code} value={item.name}>
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                        </div> */}


                        <input
                            type="submit"
                            value="Tiếp tục "
                            className="shippingBtn"
                            disabled={city ? false : true}
                        />
                    </form>
                </div>
            </div>
        </Fragment>
    );
}

export default Shipping