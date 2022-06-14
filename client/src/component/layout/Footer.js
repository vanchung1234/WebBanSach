import React from 'react'
import logo from '../../images/logo.png'
const Footer = () => {
    const url = window.location.pathname.substring(1)

    const style = {
        display: (url === 'dashboard/orders' || url === 'Myorder' || url === 'dashboard/products') ? 'none' : 'block'
    }

    return (
        <footer className="bg-dark text-center text-lg-start text-white" style={style}>
            <div className=" p-4" >

                <div className="row my-4">

                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0">

                        <div className=" shadow-1-strong d-flex align-items-center justify-content-center mb-4 mx-auto" style={{ height: '150px', width: '150px' }}>
                            <img src={logo} height="110" style={{ borderRadius: '50%' }} alt=""
                                loading="lazy" />
                        </div>

                        <p className="text-center">Ở đây có bán sách</p>

                        <ul className="list-unstyled d-flex flex-row justify-content-center">
                            <li>
                                <a className="text-white px-2" href="#!">
                                    <i className="fab fa-facebook-square"></i>
                                </a>
                            </li>
                            <li>
                                <a className="text-white px-2" href="#!">
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </li>
                            <li>
                                <a className="text-white ps-2" href="#!">
                                    <i className="fab fa-youtube"></i>
                                </a>
                            </li>
                        </ul>

                    </div>

                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase mb-4">Hỗ trợ</h5>

                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a href="#!" className="text-white">Liên hệ với chúng tối</a>
                            </li>
                            <li className="mb-2">
                                <a href="#!" className="text-white">Thông tin vận chuyển</a>
                            </li>
                            <li className="mb-2">
                                <a href="#!" className="text-white">Hoàn trả hàng</a>
                            </li>
                            <li className="mb-2">
                                <a href="#!" className="text-white">Thanh toán</a>
                            </li>

                        </ul>
                    </div>


                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase mb-4">Liên hệ</h5>

                        <ul className="list-unstyled">
                            <li>
                                <p><i className="fas fa-map-marker-alt pe-2"></i>Hai Bà Trưng, Hà Nội</p>
                            </li>
                            <li>
                                <p><i className="fas fa-phone pe-2"></i>+ 01 234 567 89</p>
                            </li>
                            <li>
                                <p><i className="fas fa-envelope pe-2 mb-0"></i>contact@example.com</p>
                            </li>
                        </ul>
                    </div>

                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase mb-4">Giờ mở cửa</h5>

                        <table className="table text-center text-white">
                            <tbody className="font-weight-normal">
                                <tr>
                                    <td>Mon - Thu:</td>
                                    <td>7am - 7pm</td>
                                </tr>
                                <tr>
                                    <td>Fri - Sat:</td>
                                    <td>7am - 7am</td>
                                </tr>
                                <tr>
                                    <td>Sunday:</td>
                                    <td>9am - 5pm</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2022 Copyright:
                <a className="text-white">vuchung</a>
            </div>
        </footer>

    )
}

export default Footer