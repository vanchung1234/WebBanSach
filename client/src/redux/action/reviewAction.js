import { postDataAPI } from "../../utils/fetchData"
import { GLOBALTYPES } from "./globalType"
import { PRODUCT_TYPES } from "./productAction"

export const createReview = ({ product, newReview, auth }) => async (dispatch) => {
    // const newProduct = { ...product, reviews: [...product.reviews, newReview] }

    // dispatch({ type: PRODUCT_TYPES.UPDATE_PRODUCT, payload: newProduct })

    try {
        const data = { ...newReview, productId: product._id }
        const res = await postDataAPI('review', data, auth.token)
        console.log(res)
        const newData = { ...res.data.newReview, user: auth.user }
        const newProduct = { ...res.data.product, reviews: [...product.reviews, newData] }

        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } })
        dispatch({ type: PRODUCT_TYPES.UPDATE_PRODUCT, payload: newProduct })

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}