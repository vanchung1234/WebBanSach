import React, { Fragment, } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Contact from '../component/Contact'
import HomeSlider from '../component/HomeSlider'
import Slider from '../component/layout/Slider'
import hieusach from '../images/hieusach.mp4'
const Home = () => {
    const { products } = useSelector((state) => state.allproducts);



    return (
        <Fragment>
            <Slider />

            <div className='container' style={{ borderBottom: '1px solid rgb(234,234,234)', paddingBottom: '140px' }} >
                <div className='heading-service mt-4'><h5 className="font-serif">For your comfort</h5>

                    <h2 className='mb-4 mt-1'>OUR SERVICES</h2></div>

                <div className='row'>
                    <div className="features-item col-sm-6 col-md-3 col-lg-3">
                        <div className='features-icon'>
                            <i className="fa-solid fa-clock"></i>
                        </div>
                        <h3 className='features-title font-alt'>OPENED 24/7</h3>
                        <span>
                            Careful attention to detail and clean, well structured code ensures a smooth user experience for all your visitors.
                        </span>
                    </div>
                    <div className="features-item col-sm-6 col-md-3 col-lg-3">
                        <div className='features-icon'>
                            <i className="fa-solid fa-car"></i>
                        </div>
                        <h3 className='features-title'>FREE PARKING</h3>
                        <span>
                            Careful attention to detail and clean, well structured code ensures a smooth user experience for all your visitors.
                        </span>
                    </div>
                    <div className="features-item col-sm-6 col-md-3 col-lg-3">
                        <div className='features-icon'>
                            <i className="fa-solid fa-map-location"></i>
                        </div>
                        <h3 className='features-title'>CENTRAL LOCATION
                        </h3>
                        <span>
                            Careful attention to detail and clean, well structured code ensures a smooth user experience for all your visitors.
                        </span>
                    </div>
                    <div className="features-item col-sm-6 col-md-3 col-lg-3">
                        <div className='features-icon'>
                            <i className="fa-solid fa-heart"></i>
                        </div>
                        <h3 className='features-title'>HIGH QUALITY
                        </h3>
                        <span>
                            Careful attention to detail and clean, well structured code ensures a smooth user experience for all your visitors.
                        </span>
                    </div>
                </div>
            </div>
            <div className='video-2'>
                <video autoPlay muted loop id="myVideo">
                    <source src={hieusach} type="video/mp4" />
                </video>

                <div className="content-1">
                    <h3>Hiệu sách Team 2</h3>
                    <h3>Đem lại tri thức - Thay đổi tương lai</h3>
                </div>
            </div>

            <div className='about-us container'>
                <div className='row'>
                    <div className="about-us-img col-md-6 col-xs-12">
                        <img className="img-fluid" src='https://daquyvietnam.info/wp-content/uploads/2016/10/11-g%E1%BB%A3i-%C3%BD-cho-kh%C3%B4ng-gian-ph%C3%B2ng-%C4%91%E1%BB%8Dc-s%C3%A1ch-l%C3%BD-t%C6%B0%E1%BB%9Fng-540x423.jpg' style={{ width: '100%' }} />
                    </div>
                    <div className="about-us-text col-md-6 col-xs-12" style={{ margin: 'auto' }}>
                        <h2 className='module-title'>ABOUT US</h2>
                        <div className='about-us-title'>
                            A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.
                        </div>
                        <p>The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar, their pronunciation and their most common words.</p>

                        <p>The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar, their pronunciation and their most common words.</p>
                    </div>

                </div>
            </div>


            <h2 className='module-title' style={{ textAlign: 'center', padding: '70px 0px' }}>Sản phẩm của chúng tôi</h2>
            <div className=" our-product ">

                <div className="row">
                    {
                        products.map((item) => (
                            <div className="col-lg-4 col-sm-6 mb-3  " key={item._id}>
                                <Link to={`/product/${item._id}`}>
                                    <div className="hover hover-1 text-white rounded"><img src={item.images[0].url} alt="" />
                                        <div className="hover-overlay"></div>
                                        <div className="hover-1-content px-5 py-4">
                                            <h3 className="hover-1-title text-uppercase font-weight-bold mb-0"> <span className="font-weight-light">Tên sản phẩm: {item.name} </span><br />Giá: {item.price}$</h3>
                                            <p className="hover-1-description font-weight-light mb-0">Giới thiệu: {item.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}


                </div>
                <div className='row' style={{ width: '100%', padding: '40px 0', backgroundColor: 'black', margin: '0px', textAlign: 'center' }}>
                    <div className='col-sm-6 col-md-8 col-lg-7'>
                        <div className='callout-text font-alt' style={{ textAlign: 'center' }}>
                            <h3 className="callout-title">Bạn muốn xem thêm nhiều sản phẩm hơn nữa?</h3>
                            <p>Còn nhiều sản phẩm hấp dẫn dành cho bạn.</p>
                        </div>
                    </div>
                    <div className='col-sm-6 col-md-4 col-lg-5'>
                        <div className='callout-btn-box'>
                            <Link className="btn btn-w btn-round" to={'/products'} style={{ margin: '0px' }}>Xem ngay</Link>
                        </div>
                    </div>
                </div>
            </div>

            <HomeSlider />

            <Contact />


        </Fragment>
    )
}

export default Home