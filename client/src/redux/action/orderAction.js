import { deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI } from "../../utils/fetchData"
import { GLOBALTYPES } from "./globalType"

export const ODER_TYPES = {
    CREATE_ORDER: 'CREATE_ORDER',
    MY_ORDERS: 'MY_ORDERS',
    GET_ALL_ODERS: 'GET_ALL_ODERS',
    UPDATE_ORDER: 'UPDATE_ORDER',
    DELETE_ORDER: 'DELETE_ORDER',
    GET_ORDER: 'GET_ORDER'
}

//create order

export const createOrder = (order, auth) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

        const res = await postDataAPI('order/new', order, auth.token)

        dispatch({
            type: ODER_TYPES.CREATE_ORDER,
            payload: { ...res.data.newOrder, user: auth.user }
        })

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.msg,
            },
        });

    } catch (error) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: error.response.data.msg }
        })
    }
}

export const getAllOrder = () => async (dispatch) => {
    try {
        const res = await getDataAPI('/admin/orders')
        dispatch({
            type: ODER_TYPES.GET_ALL_ODERS,
            payload: { ...res.data }
        })

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const deleteOrder = ({ order, auth }) => async (dispatch) => {
    dispatch({ type: ODER_TYPES.DELETE_ORDER, payload: order })
    try {
        const res = await deleteDataAPI(`admin/order/${order._id}`, auth.token)

        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const getOrder = ({ detailOrder, id, auth }) => async (dispatch) => {

    if (detailOrder.every(order => order._id !== id)) {
        try {
            const res = await getDataAPI(`order/${id}`, auth.token)
            dispatch({ type: ODER_TYPES.GET_ORDER, payload: res.data.order })
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: err.response.data.msg }
            })
        }
    }

}

export const updateOrder = (orderStatus, order) => async (dispatch) => {
    try {

        const res = await patchDataAPI(`admin/order/${order._id}`, {
            orderStatus
        })

        dispatch({ type: ODER_TYPES.UPDATE_ORDER, payload: res.data.newOrder })

        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } })
    } catch (err) {
        console.log(err)
    }
}

export const updateauto = (order) => async (dispatch) => {
    try {

        const res = await patchDataAPI(`auto/${order._id}`)

        dispatch({ type: ODER_TYPES.UPDATE_ORDER, payload: res.data.newOrder })

    } catch (err) {
        console.log(err)
    }
}

export const myOrder = ({ auth }) => async (dispatch) => {
    try {
        const res = await getDataAPI('orders/me', auth.token)
        dispatch({
            type: ODER_TYPES.MY_ORDERS,
            payload: { ...res.data }
        })

    } catch (err) {
        console.log(err)
    }
}