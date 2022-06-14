import { getDataAPI } from "../../utils/fetchData"
import { GLOBALTYPES } from "./globalType"

export const CART_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_CART_ITEM: 'REMOVE_CART_ITEM',
    SAVE_SHIPPING_INFO: 'SAVE_SHIPPING_INFO'
}

export const addToCart = (id, quantity) => async (dispatch, getState) => {
    try {
        const res = await getDataAPI(`products/${id}`)
        if (res.data.product.stock === 0) {
            return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "Het hang." } })
        }
        dispatch({
            type: CART_TYPES.ADD_TO_CART,
            payload: {
                product: res.data.product._id,
                name: res.data.product.name,
                price: res.data.product.price,
                image: res.data.product.images[0].url,
                stock: res.data.product.stock,
                quantity,
            }


        })

        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: "Add item to cart." } })
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    } catch (error) {
        // dispatch({
        //     type: GLOBALTYPES.ALERT,
        //     payload: {
        //         error: error.response.data.msg,
        //     },
        // });
        console.log(error)
    }
}
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CART_TYPES.REMOVE_CART_ITEM,
            payload: id,
        });

        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    } catch (error) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: error.response.data.msg,
            },
        });
    }

};

export const saveShippingInfo = (data) => async (dispatch) => {
    try {
        dispatch({
            type: CART_TYPES.SAVE_SHIPPING_INFO,
            payload: data,
        });

        localStorage.setItem("shippingInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: error.response.data.msg,
            },
        });
    }

};
