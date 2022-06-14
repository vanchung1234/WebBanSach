import { EditData } from "../action/globalType";
import { ODER_TYPES } from "../action/orderAction";

const initialState = {
    orders: [],


}

const myOrder = (state = initialState, action) => {
    switch (action.type) {


        case ODER_TYPES.MY_ORDERS:
            return {
                ...state,
                orders: action.payload.orders,

            };
        case ODER_TYPES.UPDATE_ORDER:
            return {
                ...state,
                orders: EditData(state.orders, action.payload._id, action.payload)
            };
        default:
            return state;
    }
}
export default myOrder