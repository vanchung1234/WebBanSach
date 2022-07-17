import React, { useState, Fragment, useEffect } from 'react'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import ReviewCard from './ReviewCard';
import { addToCart } from '../../redux/action/cartAction';
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { createReview } from '../../redux/action/reviewAction';
import { genericProducts } from '../../redux/action/productAction';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link, useNavigate } from 'react-router-dom';

const DetailProduct = ({ product }) => {
    const dispatch = useDispatch()
    const category = product.category
    useEffect(() => {
        dispatch(genericProducts(product, category))
    }, [dispatch, product, category])

    const { auth, generic } = useSelector(state => state)
    const navigate = useNavigate()
    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };

    const alert = useAlert();

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantity = () => {
        if (product.stock <= quantity) {
            alert.error('Số lượng bạn đặt vượt quá số lượng có sẵn')
            return;
        }

        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    };

    const id = product._id

    const addToCartHandler = () => {
        if (!auth.token) {
            navigate("/login")
            return alert.error('Xin mời đăng nhập')

        } else {
            dispatch(addToCart(id, quantity));

        }
    };

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };

    const reviewSubmitHandler = (e) => {
        e.preventDefault()

        if (!auth.token) {
            navigate("/login")
            return alert.error('Xin mời đăng nhập')
        } else {
            const newReview = {
                rating,
                user: auth.user,
                comment,
                createdAt: new Date().toISOString(),
            }
            dispatch(createReview({ product, newReview, auth }))
            setOpen(false);
        }

    };



    return (

        <Fragment>
            <div className="ProductDetails">
                <div>
                    <Carousel autoPlay>
                        {product.images &&
                            product.images.map((item, i) => (
                                <img
                                    key={i}
                                    src={item.url}
                                    alt={`${i} Slide`}
                                />
                            ))}
                    </Carousel>
                </div>

                <div>
                    <div className="detailsBlock-1">
                        <h2>{product.name}</h2>
                        <p>Sản phẩm # {product._id}</p>
                    </div>
                    <div className="detailsBlock-2">
                        <Rating {...options} />
                        <span className="detailsBlock-2-span">
                            ({product.ratings} )
                            ({product.numOfReviews} Reviews)

                        </span>
                    </div>
                    <div className="detailsBlock-3">
                        <h1>{`${product.price}$`}</h1>
                        <div className="detailsBlock-3-1">
                            <div className="detailsBlock-3-1-1">
                                <div className="detailsBlock-3-1-1">
                                    <button onClick={decreaseQuantity}>-</button>
                                    <input readOnly type="number" value={quantity} />
                                    <button onClick={increaseQuantity}>+</button>
                                </div>
                            </div>
                            <button
                                disabled={product.Stock < 1 ? true : false}
                                onClick={addToCartHandler}
                            >
                                Thêm vào giỏ hàng
                            </button>
                        </div>

                        <p>
                            Trạng thái:
                            <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                {product.stock < 1 ? "Hết hàng" : "Còn hàng"}
                            </b>
                            <br />
                            <span>Có {product.stock} sản phẩm có sẵn</span>
                        </p>
                    </div>

                    <div className="detailsBlock-4">
                        Mô tả : <p>{product.description}</p>
                    </div>

                    <button onClick={submitReviewToggle} className="submitReview">
                        Thêm đánh giá
                    </button>
                </div>
            </div>

            <h3 className="reviewsHeading">Đánh giá</h3>

            <Dialog
                aria-labelledby="simple-dialog-title"
                open={open}
                onClose={submitReviewToggle}
            >
                <DialogTitle>Thêm đánh giá</DialogTitle>
                <DialogContent className="submitDialog">
                    <Rating
                        onChange={(e) => setRating(e.target.value)}
                        value={rating}
                        size="large"
                    />

                    <textarea
                        className="submitDialogTextArea"
                        cols="30"
                        rows="5"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                </DialogContent>
                <DialogActions>
                    <Button onClick={submitReviewToggle} color="secondary">
                        Hủy đánh giá
                    </Button>
                    <Button color="primary" onClick={reviewSubmitHandler}>
                        đánh giả
                    </Button>
                </DialogActions>
            </Dialog>

            {product.reviews && product.reviews[0] ? (
                <div className="reviews">
                    {product.reviews &&
                        product.reviews.map((review) => (
                            <ReviewCard key={review._id} review={review} />
                        ))}
                </div>
            ) : (
                <p className="noReviews">Chưa có đánh giá nào cả</p>
            )}

            <h3 className="reviewsHeading">Sản phẩm cùng loại</h3>

            <div>
                <Carousel autoPlay showThumbs={false}>
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
            </div>
        </Fragment>
    )
}

export default DetailProduct