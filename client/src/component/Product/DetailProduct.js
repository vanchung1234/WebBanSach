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
import CarouselProduct from '../CarouselProduct';
import { useNavigate } from 'react-router-dom';

const DetailProduct = ({ product }) => {
    const dispatch = useDispatch()
    const category = product.category
    useEffect(() => {
        dispatch(genericProducts(product, category))
    }, [dispatch, product, category])

    const { auth } = useSelector(state => state)
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
            alert.error('So luong ban dat vuot qua so luong ton kho')
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
            return alert.error('Xin moi dang nhap')

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
            return alert.error('xin moi dang nhap')
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
                        <p>Product # {product._id}</p>
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
                                Add to Cart
                            </button>
                        </div>

                        <p>
                            Status:
                            <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                {product.stock < 1 ? "OutOfStock" : "InStock"}
                            </b>
                            <br />
                            <span>Co {product.stock} san pham co san</span>
                        </p>
                    </div>

                    <div className="detailsBlock-4">
                        Description : <p>{product.description}</p>
                    </div>

                    <button onClick={submitReviewToggle} className="submitReview">
                        Submit Review
                    </button>
                </div>
            </div>

            <h3 className="reviewsHeading">REVIEWS</h3>

            <Dialog
                aria-labelledby="simple-dialog-title"
                open={open}
                onClose={submitReviewToggle}
            >
                <DialogTitle>Submit Review</DialogTitle>
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
                        Cancel
                    </Button>
                    <Button color="primary" onClick={reviewSubmitHandler}>
                        Submit
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
                <p className="noReviews">No Reviews Yet</p>
            )}

            <h3 className="reviewsHeading">San Pham cung loai</h3>

            <CarouselProduct />

        </Fragment>
    )
}

export default DetailProduct