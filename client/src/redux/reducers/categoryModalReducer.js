import { GLOBALTYPES } from "../action/globalType";

const categoryModalReducer = (state = false, action) => {
    switch (action.type) {
        case GLOBALTYPES.CATEGORY_MODAL:
            return action.payload;
        default:
            return state;
    }
};

export default categoryModalReducer;