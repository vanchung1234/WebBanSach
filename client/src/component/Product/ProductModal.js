import React, { useState, Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/action/globalType'
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { Button } from "@material-ui/core";
import { imageShow } from '../../utils/mediaShow'

import { createProduct, updateProduct } from '../../redux/action/productAction';
const ProductModal = () => {
    const { auth, categorys, productModal } = useSelector(state => state)
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState("")
    const [category, setCategory] = useState("")
    const [images, setImages] = useState([])

    const handleChangeImages = e => {
        const files = [...e.target.files]
        let err = ""
        let newImages = []

        files.forEach(file => {
            if (!file) return err = "File does not exist."

            if (file.size > 1024 * 1024 * 5) {
                return err = "The image/video largest is 5mb."
            }

            return newImages.push(file)
        })

        if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } })
        setImages([...images, ...newImages])
    }

    const deleteImages = (index) => {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        if (images.length === 0)
            return dispatch({
                type: GLOBALTYPES.ALERT, payload: { error: "Please add your photo." }
            })

        if (productModal.onEdit) {
            dispatch(updateProduct({ name, description, price, stock, category, images, auth, productModal }))
        } else {
            dispatch(createProduct({ name, description, price, stock, category, images, auth }))
        }
        setImages([])
        dispatch({ type: GLOBALTYPES.PRODUCT_MODAL, payload: false })
    }

    useEffect(() => {
        if (productModal.onEdit) {
            setName(productModal.name)
            setCategory(productModal.category)
            setDescription(productModal.description)
            setStock(productModal.stock)
            setPrice(productModal.price)
            setImages(productModal.images)
        }
    }, [productModal])

    const styleModal = {
        zIndex: productModal ? 10 : 0
    }
    return (
        <Fragment>
            <div className="updateProfileContainer" style={styleModal}>
                <div className="updateProfileBox">
                    <div className="d-flex"><h2 className="updateProfileHeading">Create Product</h2>
                        <span className="close" onClick={() => dispatch({
                            type: GLOBALTYPES.PRODUCT_MODAL, payload: false
                        })}>
                            &times;
                        </span></div>
                    <form
                        className="updateProfileForm" onSubmit={handleSubmit}
                    >
                        <div className="updateProfileName">
                            <input
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className="updateProfileName">
                            <input
                                type="text"
                                placeholder="description"

                                name="description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="updateProfileName">
                            <input
                                type="text"
                                placeholder="Price: "
                                name="price"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="updateProfileName">
                            <input
                                type="text"
                                placeholder="stock: "
                                name="stock"
                                value={stock}
                                onChange={e => setStock(e.target.value)}
                            />
                        </div>
                        <div className="updateProfileName">
                            <select className='optionupdate' name="category" value={category} onChange={e => setCategory(e.target.value)}  >
                                <option value="">Please select a category</option>
                                {
                                    categorys.categories.map(category => (
                                        <option value={category.name} key={category._id}>
                                            {category.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="image-input">
                            <input
                                type="file"
                                name="file"
                                accept="image/*"
                                onChange={handleChangeImages}
                            />
                        </div>
                        <div className="updateProfileImage">
                            {
                                images.map((img, index) => (
                                    <div key={index} id="file_img">
                                        {
                                            img.url
                                                ? <>
                                                    {
                                                        imageShow(img.url,)
                                                    }
                                                </>
                                                : <>
                                                    {
                                                        imageShow(URL.createObjectURL(img))
                                                    }
                                                </>
                                        }
                                        <span onClick={() => deleteImages(index)}>&times;</span>
                                    </div>
                                ))
                            }
                        </div>
                        <input
                            type="submit"
                            value="UpLoad"
                            className="updateProfileBtn"
                        />
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default ProductModal