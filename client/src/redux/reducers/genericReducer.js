import { PRODUCT_TYPES } from "../action/productAction";

const genericReducer = (state = [], action) => {
    switch (action.type) {
        case PRODUCT_TYPES.GENERIC_PRODUCT:
            return action.payload

        default:
            return state;
    }
}

export default genericReducer