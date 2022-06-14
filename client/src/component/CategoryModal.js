import React, { useEffect, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createCategory, updateCategory } from '../redux/action/categoryAction'
import { GLOBALTYPES } from '../redux/action/globalType'
import FaceIcon from "@material-ui/icons/Face";

const CategoryModal = () => {
    const { auth, categoryModal } = useSelector(state => state)
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (categoryModal.onEdit) {
            dispatch(updateCategory({ name, auth, categoryModal }))
        } else {
            dispatch(createCategory({ name, auth }))
        }

        setName('')
    }

    useEffect(() => {
        if (categoryModal.onEdit) {
            setName(categoryModal.name)
        }
    }, [categoryModal])

    const styleModal = {
        zIndex: categoryModal ? 10 : 0
    }

    return (
        <Fragment>
            <div className="updateProfileContainer" style={styleModal}>
                <div className="updateProfileBox">
                    <div className="d-flex"><h2 className="updateProfileHeading">Category</h2>
                        <span className="close" onClick={() => dispatch({
                            type: GLOBALTYPES.CATEGORY_MODAL, payload: false
                        })}>
                            &times;
                        </span>
                    </div>
                    <form
                        className="updateProfileForm"
                        onSubmit={handleSubmit}
                    >
                        <div className="updateProfileName">
                            <FaceIcon />
                            <input
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>

                        <button className="btn btn-secondary w-100" type="submit">
                            Post
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default CategoryModal