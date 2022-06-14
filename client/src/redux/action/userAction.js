import { GLOBALTYPES } from "./globalType"
import { deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI } from '../../utils/fetchData'
import { imageUpload } from "../../utils/imageUpload"
import valid from "../../utils/valid"

export const USERS_TYPES = {
    LOADING: "LOADING_USER",
    GET_USER: "GET_USER",
    GET_ID: "GET_USER_ID",
    GET_ALL_USER: "GET_ALL_USER",
    DELETE_USER: 'DELETE_USER',
    UPDATE_USER: "UPDATE_USER"

};

export const forgotPassword = (data) => async (dispatch) => {
    const check = valid(data)
    if (check.errLength > 0)
        return dispatch({ type: GLOBALTYPES.ALERT, payload: check.errMsg })
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

        const res = await postDataAPI('user/forgotPassword', data)
        dispatch({ type: GLOBALTYPES.AUTH, payload: res.data.msg })
    } catch (error) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: error.response.data.msg,
            },
        });
    }
}

//update password
export const updatePassword = (userData, auth) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

        const res = await patchDataAPI(
            "user/password",
            {
                ...userData,
            },
            auth.token
        );

        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
                ...auth,
                user: {
                    ...auth.user,
                    ...userData,
                },
            },
        });
        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (error) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: error.response.data.msg }
        })
    }
}

//update Profile
export const updateProfileUser = ({ userData, avatar, auth }) => async (dispatch) => {

    try {
        let media;
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

        if (avatar) media = await imageUpload([avatar], auth.token)

        const res = await patchDataAPI("user/profile", {
            ...userData,
            avatar: avatar ? media[0].url : auth.user.avatar
        }, auth.token)

        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
                ...auth,
                user: {
                    ...auth.user, ...userData,
                    avatar: avatar ? media[0].url : auth.user.avatar,
                }
            }
        })

        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const getUser =
    ({ id, auth }) =>
        async (dispatch) => {
            dispatch({ type: USERS_TYPES.GET_ID, payload: id });

            try {
                dispatch({ type: USERS_TYPES.LOADING, payload: true });
                const res = getDataAPI(`admin/user/${id}`, auth.token);

                const users = await res;

                dispatch({
                    type: USERS_TYPES.GET_USER,
                    payload: users.data,
                });

                dispatch({ type: USERS_TYPES.LOADING, payload: false });
            } catch (err) {
                dispatch({
                    type: GLOBALTYPES.ALERT,
                    payload: { error: err.response.data.msg },
                });
            }
        };

export const getAllUser = () => async (dispatch) => {
    try {
        const res = await getDataAPI('admin/user')
        dispatch({ type: USERS_TYPES.GET_ALL_USER, payload: { ...res.data } })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const deleteUser = ({ user, auth }) => async (dispatch) => {
    dispatch({ type: USERS_TYPES.DELETE_USER, payload: user })
    try {
        const res = await deleteDataAPI(`admin/user/${user._id}`, auth.token)

        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } })
    } catch (err) {
        // dispatch({
        //     type: GLOBALTYPES.ALERT,
        //     payload: { error: err.response.data.msg }
        // })
        console.log(err)
    }
}

export const updateUser = (role, user) => async (dispatch) => {

    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

        const res = await patchDataAPI(`admin/user/${user._id}`, {
            role
        })

        console.log(res)

        dispatch({ type: USERS_TYPES.UPDATE_USER, payload: res.data.newUser })

        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } })
    } catch (err) {
        console.log(err)
    }
}
