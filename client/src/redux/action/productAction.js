import { deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI } from "../../utils/fetchData"
import { imageUpload } from "../../utils/imageUpload"
import { GLOBALTYPES } from "./globalType"

export const PRODUCT_TYPES = {
    CREATE_PRODUCT: 'CREATE_PRODUCT',
    LOADING_PRODUCT: 'LOADING_PRODUCT',
    GET_PRODUCTS: 'GET_PRODUCTS',
    UPDATE_PRODUCT: 'UPDATE_PRODUCT',
    GET_PRODUCT: 'GET_PRODUCT',
    DELETE_PRODUCT: 'DELETE_PRODUCT',
    GENERIC_PRODUCT: 'GENERIC_PRODUCT',
    GET_ALL_PRODUCT: 'GET_ALL_PRODUCT'

}

export const createProduct = ({ name, description, price, stock, category, images, auth }) => async (dispatch) => {
    let media = []
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
        if (images.length > 0) media = await imageUpload(images)

        const res = await postDataAPI('products', { name, description, price, stock, category, images: media }, auth.token)

        dispatch({
            type: PRODUCT_TYPES.CREATE_PRODUCT,
            payload: { ...res.data.newProduct, user: auth.user }
        })

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.msg,
            },
        });


    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const updateProduct = ({ name, description, price, stock, category, images, auth, productModal }) => async (dispatch) => {
    let media = []
    const imgNewUrl = images.filter(img => !img.url)
    const imgOldUrl = images.filter(img => img.url)
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
        if (imgNewUrl.length > 0) media = await imageUpload(imgNewUrl)


        const res = await patchDataAPI(`products/${productModal._id}`, {
            name, description, price, stock, category, images: [...imgOldUrl, ...media]
        }, auth.token)

        dispatch({ type: PRODUCT_TYPES.UPDATE_PRODUCT, payload: res.data.newProduct })

        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } })
    } catch (err) {
        console.log(err)
    }
}

export const deleteProduct = ({ product, auth }) => async (dispatch) => {
    dispatch({ type: PRODUCT_TYPES.DELETE_PRODUCT, payload: product })
    try {
        const res = await deleteDataAPI(`products/${product._id}`, auth.token)

        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const getProduct = ({ detailProduct, id, auth }) => async (dispatch) => {
    if (detailProduct.every(product => product._id !== id)) {
        try {
            const res = await getDataAPI(`products/${id}`, auth.token)
            dispatch({ type: PRODUCT_TYPES.GET_PRODUCT, payload: res.data.product })
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: err.response.data.msg }
            })
        }
    }
}

export const getProducts = (page, category, sort, searchs) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_TYPES.LOADING_PRODUCT, payload: true })
        const res = await getDataAPI(`products?page=${page}&${category}&${sort}&name[regex]=${searchs}`)
        dispatch({
            type: PRODUCT_TYPES.GET_PRODUCTS,
            payload: { ...res.data }
        })

        dispatch({ type: PRODUCT_TYPES.LOADING_PRODUCT, payload: false })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const genericProducts = (product, category) => async (dispatch) => {
    try {
        const res = await getDataAPI(`generic/${product._id}?category=${category}`)
        dispatch({ type: PRODUCT_TYPES.GENERIC_PRODUCT, payload: { ...res.data } })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const getAllProduct = () => async (dispatch) => {
    try {
        const res = await getDataAPI('allproduct')
        dispatch({ type: PRODUCT_TYPES.GET_ALL_PRODUCT, payload: { ...res.data } })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

