import { GLOBALTYPES } from "../action/globalType";

const modalReducer = (state = false, action) => {
    switch (action.type) {
        case GLOBALTYPES.MODAL:
            return action.payload;
        default:
            return state;
    }
};

export default modalReducer;