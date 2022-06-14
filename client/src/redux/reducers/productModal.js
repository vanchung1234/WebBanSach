import { GLOBALTYPES } from "../action/globalType";

const productModalReducer = (state = false, action) => {
    switch (action.type) {
        case GLOBALTYPES.PRODUCT_MODAL:
            return action.payload;
        default:
            return state;
    }
};

export default productModalReducer;