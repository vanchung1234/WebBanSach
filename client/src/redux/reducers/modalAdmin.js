import { GLOBALTYPES } from "../action/globalType";

const modalAdmin = (state = false, action) => {
    switch (action.type) {
        case GLOBALTYPES.ADMIN_MODAL:
            return action.payload;
        default:
            return state;
    }
};

export default modalAdmin;