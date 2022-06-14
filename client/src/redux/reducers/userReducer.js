import { DeleteData, EditData } from "../action/globalType";
import { USERS_TYPES } from "../action/userAction"

const initialState = {
    users: [],
    result: 0,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USERS_TYPES.LOADING: {
            return {
                ...state,
                loading: action.payload

            }
        }
        case USERS_TYPES.GET_USER:
            return {
                ...state,
                users: [...state.users, action.payload.user]
            };


        case USERS_TYPES.GET_ALL_USER:
            return {
                ...state,
                users: action.payload.users,
                result: action.payload.result,

            };
        case USERS_TYPES.UPDATE_USER:
            return {
                ...state,
                users: EditData(state.users, action.payload._id, action.payload)
            };
        case USERS_TYPES.DELETE_USER:
            return {
                ...state,
                users: DeleteData(state.users, action.payload._id)
            };
        default:
            return state;
    }
}

export default userReducer