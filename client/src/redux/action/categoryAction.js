import { deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI } from "../../utils/fetchData"
import { GLOBALTYPES } from "./globalType"


export const CATEGORY_TYPES = {
    CREATE_CATEGORY: 'CREATE_CATEGORY',
    LOADING_CATEGORY: 'LOADING_CATEGORY',
    GET_CATEGORIES: 'GET_CATEGORIES',
    UPDATE_CATEGORY: 'UPDATE_CATEGORY',
    GET_CATEGORY: 'GET_CATEGORY',
    DELETE_CATEGORY: 'DELETE_CATEGORY'
}

export const createCategory = ({ name, auth }) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

        const res = await postDataAPI('categories', { name }, auth.token)

        dispatch({
            type: CATEGORY_TYPES.CREATE_CATEGORY,
            payload: { ...res.data.newCategory, user: auth.user }
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

export const getCategories = (auth) => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_TYPES.LOADING_CATEGORY, payload: true })
        const res = await getDataAPI('categories', auth.token)

        dispatch({
            type: CATEGORY_TYPES.GET_CATEGORIES,
            payload: { ...res.data, page: 1 }
        })

        dispatch({ type: CATEGORY_TYPES.LOADING_CATEGORY, payload: false })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}
export const updateCategory = ({ name, auth, categoryModal }) => async (dispatch) => {
    try {
        console.log(categoryModal)
        console.log(auth)
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
        const res = await patchDataAPI(`category/${categoryModal._id}`, {
            name
        }, auth.token)
        console.log(res)
        dispatch({ type: CATEGORY_TYPES.UPDATE_CATEGORY, payload: res.data.newCategory })

        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } })
    } catch (err) {
        console.log(err)
    }
}

export const deleteCategory = ({ category, auth }) => async (dispatch) => {
    dispatch({ type: CATEGORY_TYPES.DELETE_CATEGORY, payload: category })
    try {
        const res = await deleteDataAPI(`category/${category._id}`, auth.token)
        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}