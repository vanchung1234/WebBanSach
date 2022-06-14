import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/action/globalType'
import { deleteProduct, getProducts } from '../../redux/action/productAction'
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";


const Products = ({ product }) => {
    const options = {
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()
    const Delete = () => {
        dispatch(deleteProduct({ product, auth }))
    }
    const Update = () => {
        dispatch({ type: GLOBALTYPES.PRODUCT_MODAL, payload: { ...product, onEdit: true } })
    }
    return (

        <div className="productCard">
            <Link className='product-link' to={`/product/${product._id}`}>
                <img src={product.images[0].url} alt={product.name} />
                <p>{product.name}</p>
                <p>{product.description}</p>

                <div className='ratings'>
                    <Rating {...options} />{" "}
                    <span className="productCardSpan">
                        {" "}
                        ({product.numOfReviews} Reviews)
                    </span>
                </div>
                <span>{`${product.price}$`}</span>
            </Link>
            {/* {
                auth.user.role === "admin" &&
                <div className='admin-btn'>
                    <div className="Edit" >
                        <span className="material-icons " onClick={Update}>create</span> Edit
                    </div>
                    <div className="Delete"  >
                        <span className="material-icons" onClick={Delete}>delete_outline</span> Remove
                    </div>
                </div>
            } */}

        </div>

    )

}

export default Products