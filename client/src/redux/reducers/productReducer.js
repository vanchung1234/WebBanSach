import { EditData } from "../action/globalType";
import { PRODUCT_TYPES } from "../action/productAction";

const initialState = {
    loading: false,
    products: [],
    result: 0,
    count: 0,

}

const productReducer = (state = initialState, action) => {
    switch (action.type) {

        case PRODUCT_TYPES.LOADING_PRODUCT:
            return {
                ...state,
                loading: action.payload
            };
        case PRODUCT_TYPES.GET_PRODUCTS:
            return {
                ...state,
                products: action.payload.products,
                result: action.payload.result,
                count: action.payload.count,
            };
        case PRODUCT_TYPES.UPDATE_PRODUCT:
            return {
                ...state,
                products: EditData(state.products, action.payload._id, action.payload)
            };
        default:
            return state;
    }
}

export default productReducer