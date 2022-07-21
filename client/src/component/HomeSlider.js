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
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBy9wGbJdcFQTbsUmbHvMvmW3Qxs7YdPwvgjfDYXiv1MxBVb8xDKAhyyjztoRFYdCsW4E&usqp=CAU"
                    style={{
                        display: 'block',
                        height: '100%',
                        margin: 'auto',
                        width: '100%'
                    }}
                />
                <div className='centered'>
                    <i className="fa-solid slider-icon fa-2xl fa-quote-left"></i>
                    <span className='font-alt hst py-3 '>Học, học nữa, học mãi</span>
                    <i className="fa-solid slider-icon fa-2xl fa-quote-right"></i>
                    <span>Lenin</span>
                </div>
            </div>



            <div className='slider_home'>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTThkO20lx6x0a887tW6OnbqyveZcyEU6tsmg&usqp=CAU"
                    style={{
                        display: 'block',
                        height: '100%',
                        margin: 'auto',
                        width: '100%'
                    }}
                />
                <div className='centered'>
                    <i className="fa-solid slider-icon fa-2xl fa-quote-left"></i>
                    <span className='font-alt hst py-3'>Tất cả những gì con người làm, nghĩ hoặc trở thành được bảo tồn một cách kỳ diệu trên những trang sách</span>
                    <i className="fa-solid slider-icon fa-2xl fa-quote-right"></i>
                    <span>Thomas Carlyle</span>
                </div>
            </div>

            <div className='slider_home'>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1JgWTbxWccBvm5_aAk-6_t_19sBAE_hrIGXbZMxzCF_Wutr2FyXGK1mDo4tP9qxRKqrc&usqp=CAU"
                    style={{
                        display: 'block',
                        height: '100%',
                        margin: 'auto',
                        width: '100%'
                    }}
                />
                <div className='centered'>
                    <i className="fa-solid slider-icon fa-2xl fa-quote-left"></i>
                    <span className='font-alt hst py-3'>Sách là nguồn của cải quý báu của thế giới và là di sản xứng đáng của các thế hệ và các quốc gia</span>
                    <i className="fa-solid slider-icon fa-2xl fa-quote-right"></i>
                    <span>Henry David Thoreau</span>
                </div>
            </div>
        </Carousel>
    )
}

export default HomeSlider