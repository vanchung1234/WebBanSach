import { DeleteData, EditData } from "../action/globalType";
import { PRODUCT_TYPES } from "../action/productAction";
const initialState = {

    products: [],
    result: 0,

}
const allProduct = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_TYPES.CREATE_PRODUCT:
            return {
                ...state,
                products: [action.payload, ...state.products]
            };
        case PRODUCT_TYPES.GET_ALL_PRODUCT:
            return {
                ...state,
                products: action.payload.products,
                result: action.payload.result,

            };
        case PRODUCT_TYPES.UPDATE_PRODUCT:
            return {
                ...state,
                products: EditData(state.products, action.payload._id, action.payload)
            };
        case PRODUCT_TYPES.DELETE_PRODUCT:
            return {
                ...state,
                products: DeleteData(state.products, action.payload._id)
            };
        default:
            return state;
    }
}

export default allProduct