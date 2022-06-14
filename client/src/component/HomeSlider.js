import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const HomeSlider = () => {
    return (
        <Carousel
            additionalTransfrom={0}
            arrows
            autoPlay
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            dotListclassName=""
            draggable
            focusOnSelect={false}
            infinite
            itemclassName=""
            keyBoardControl
            minimumTouchDrag={80}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
                desktop: {
                    breakpoint: {
                        max: 3000,
                        min: 1024
                    },
                    items: 1
                },
                mobile: {
                    breakpoint: {
                        max: 464,
                        min: 0
                    },
                    items: 1
                },
                tablet: {
                    breakpoint: {
                        max: 1024,
                        min: 464
                    },
                    items: 1
                }
            }}
            showDots
            slidesToSlide={1}
            swipeable
        >
            <div className='slider_home'>
                <img
                    src="https://toigingiuvedep.vn/wp-content/uploads/2021/11/hinh-anh-cuon-sach-mo-ra-ben-ly-ca-phe.jpg"
                    style={{
                        display: 'block',
                        height: '100%',
                        margin: 'auto',
                        width: '100%'
                    }}
                />
                <div className='centered'>
                    <i className="fa-solid slider-icon fa-2xl fa-quote-left"></i>
                    <span className='font-alt py-3'>Học, học nữa, học mãi</span>
                    <i className="fa-solid slider-icon fa-2xl fa-quote-right"></i>
                    <span>Lenin</span>
                </div>
            </div>



            <div className='slider_home'>
                <img
                    src="https://img4.thuthuatphanmem.vn/uploads/2020/12/26/anh-cuon-sach-mo-ra-dep_051456444.jpg"
                    style={{
                        display: 'block',
                        height: '100%',
                        margin: 'auto',
                        width: '100%'
                    }}
                />
                <div className='centered'>
                    <i className="fa-solid slider-icon fa-2xl fa-quote-left"></i>
                    <span className='font-alt py-3'>Tất cả những gì con người làm, nghĩ hoặc trở thành được bảo tồn một cách kỳ diệu trên những trang sách</span>
                    <i className="fa-solid slider-icon fa-2xl fa-quote-right"></i>
                    <span>Thomas Carlyle</span>
                </div>
            </div>

            <div className='slider_home'>
                <img
                    src="https://chuaadida.com/Images/News/chuaadida_full_moi-con-nguoi-deu-la-mot-cuon-sach-hay.jpg"
                    style={{
                        display: 'block',
                        height: '100%',
                        margin: 'auto',
                        width: '100%'
                    }}
                />
                <div className='centered'>
                    <i className="fa-solid slider-icon fa-2xl fa-quote-left"></i>
                    <span className='font-alt py-3'>Sách là nguồn của cải quý báu của thế giới và là di sản xứng đáng của các thế hệ và các quốc gia</span>
                    <i className="fa-solid slider-icon fa-2xl fa-quote-right"></i>
                    <span>Henry David Thoreau</span>
                </div>
            </div>
        </Carousel>
    )
}

export default HomeSlider