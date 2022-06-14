import { EditData } from "../action/globalType";
import { ODER_TYPES } from "../action/orderAction";

const detailOrderReducer = (state = [], action) => {
    switch (action.type) {
        case ODER_TYPES.GET_ORDER:
            return [...state, action.payload]
        case ODER_TYPES.UPDATE_ORDER:
            return EditData(state, action.payload._id, action.payload)
        default:
            return state;
    }
}


export default detailOrderReducer