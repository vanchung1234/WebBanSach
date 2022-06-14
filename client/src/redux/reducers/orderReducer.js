
import { DeleteData, EditData } from '../action/globalType';
import { ODER_TYPES } from '../action/orderAction'

const initialState = {
    totalAmount: 0,
    orders: []
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ODER_TYPES.CREATE_ORDER:
            return {
                ...state,
                orders: [action.payload, ...state.orders]
            };
        case ODER_TYPES.GET_ALL_ODERS:
            return {
                ...state,
                orders: action.payload.orders,
                totalAmount: action.payload.totalAmount,

            };
        case ODER_TYPES.UPDATE_ORDER:
            return {
                ...state,
                orders: EditData(state.orders, action.payload._id, action.payload),
            };

        case ODER_TYPES.DELETE_ORDER:
            return {
                ...state,
                orders: DeleteData(state.orders, action.payload._id)
            };
        default:
            return state;
    }
}

export default orderReducer