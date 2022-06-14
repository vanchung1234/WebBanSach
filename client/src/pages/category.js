import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Categories from '../component/Categories'
import { GLOBALTYPES } from '../redux/action/globalType'
const Category = () => {
    const { categorys, auth } = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <div className="categories">
            <span className="mb-4 "
                onClick={() => dispatch({ type: GLOBALTYPES.CATEGORY_MODAL, payload: true })}>
                Create Category
            </span>
            <div className="col-12">
                {
                    categorys.categories.map(category => (
                        <Categories key={category._id} category={category} />
                    ))
                }
            </div>
        </div>
    )
}

export default Category