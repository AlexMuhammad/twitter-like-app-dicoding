import api from "../../utils/api"
import { setAuthUserActionCreator } from "../authUser/action"

/**
 * @TODO: Define all the actions (creator) for the isPreLoad state
 */
const ActionType = {
    SET_IS_PRELOAD: 'SET_IS_PRELOAD'
}

const setIsPreloadActionCreator = (isPreload) => {
    return{
        type: ActionType.SET_IS_PRELOAD,
        payload: {
            isPreload
        }
    }
}

const asyncPreloadProcess = () => {
    return async (dispatch) => {
        try {
            const authUser = await api.getOwnProfile();
            dispatch(setAuthUserActionCreator(authUser))
        } catch (error) {
            dispatch(setAuthUserActionCreator(null))
        }finally{
            dispatch(setIsPreloadActionCreator(false))
        }
    }
}

export {
    ActionType,
    asyncPreloadProcess,
    asyncPreloadProcess
}