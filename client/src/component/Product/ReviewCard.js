import { Rating } from "@material-ui/lab";
import React from "react";

const ReviewCard = ({ review }) => {
    const options = {
        value: review.rating,
        readOnly: true,
        precision: 0.5,
    };

    return (
        <div className="reviewCard">
            <img src={review.user.avatar} alt="User" />
            <p>{review.user.username}</p>
            <Rating {...options} />

            <span className="reviewCardComment">{review.comment}</span>
        </div>
    );
};

export default ReviewCard;