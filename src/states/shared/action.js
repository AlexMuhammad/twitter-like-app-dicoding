import api from "../../utils/api"
import { receiveTalksActionCreator } from "../talks/action";
import { receiveUsersActionCreator } from "../users/action";

/**
 * @TODO: Define all the actions (creator) that uses a combination of actions from various domain
 */
function asyncPopulateUsersAndTalks(){
    return async (dispatch) => {
        try {
            const users = await api.getAllUsers();
            const talks = await api.getAllTalks();

            dispatch(receiveTalksActionCreator(talks));
            dispatch(receiveUsersActionCreator(users));
        } catch (error) {
            alert(error.message);
        }
    }
}

export {
    asyncPopulateUsersAndTalks
}