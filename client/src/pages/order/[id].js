import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getOrder } from '../../redux/action/orderAction'
import ProcessOrder from '../../component/admin/ProcessOrder'

const Order = () => {
    const { id } = useParams()
    const [order, setOrder] = useState([])

    const { auth, detailOrder } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOrder({ detailOrder, id, auth }))

        if (detailOrder.length > 0) {
            const newArr = detailOrder.filter(order => order._id === id)
            setOrder(newArr)
        }
    }, [detailOrder, dispatch, id, auth])


    return (
        <> {
            order.map(item => (
                <ProcessOrder key={item._id} order={item} />
            ))
        }</>
    )
}

export default Order