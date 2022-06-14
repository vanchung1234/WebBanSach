import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const CarouselProduct = () => {
    const { generic } = useSelector(state => state)
    return (

        <Carousel
            additionalTransfrom={0}
            arrows
            autoPlay
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
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
                    items: 3,
                    partialVisibilityGutter: 40

                },
                mobile: {
                    breakpoint: {
                        max: 464,
                        min: 0
                    },
                    items: 1,
                    slidesToSlide: 1
                },
                tablet: {
                    breakpoint: {
                        max: 1024,
                        min: 464
                    },
                    items: 2,
                    slidesToSlide: 2
                }
            }}

            showDots={false}
            sliderClass=""
            slidesToSlide={2}
            swipeable
        >
            {
                generic.products?.map((item) => (
                    <Link className='product-link' to={`/product/${item._id}`} key={item._id}>
                        <div id="product-1" className="single-product" >
                            <div className="part-1">
                                <img src={item.images[0].url} />

                            </div>
                            <div className="part-2">
                                <h3 className="product-title">{item.name}</h3>
                                {/* <h4 className="product-old-price">$79.99</h4> */}
                                <h4 className="product-price">{item.price}$</h4>
                            </div>
                        </div>
                    </Link>
                ))}

        </Carousel>
    )
}

export default CarouselProduct