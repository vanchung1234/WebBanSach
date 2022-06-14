import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import DetailProduct from '../../component/Product/DetailProduct'

const Product = () => {
    const { id } = useParams()
    const [product, setProduct] = useState([])

    const { auth, allproducts } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {

        const newArr = allproducts.products.filter(product => product._id === id)
        setProduct(newArr)

    }, [allproducts.products, dispatch, id, auth])

    return (
        <div>
            {
                product.map(item => (
                    <DetailProduct key={item._id} product={item} />
                ))
            }
        </div>
    )
}

export default Product