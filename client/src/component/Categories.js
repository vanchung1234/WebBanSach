import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategory } from '../redux/action/categoryAction'
import { GLOBALTYPES } from '../redux/action/globalType'
const Categories = ({ category }) => {
    const { auth } = useSelector(state => state)

    const dispatch = useDispatch()

    const Delete = () => {
        dispatch(deleteCategory({ category, auth }))
    }

    const Update = () => {
        dispatch({ type: GLOBALTYPES.CATEGORY_MODAL, payload: { ...category, onEdit: true } })
    }

    return (
        <div className="row" >
            <p>{category.name}</p>
            <div>
                <button onClick={Update} >Edit</button>
                <button onClick={Delete}>Delete</button>
            </div>
        </div>
    )
}

export default Categories