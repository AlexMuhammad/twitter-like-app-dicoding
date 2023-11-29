import { func } from "prop-types"
import api from "../../utils/api"

/**
 * @TODO: Define all the actions (creator) for the talks state
 */
const ActionType = {
    RECEIVE_TALKS: 'RECEIVE_TALKS',
    ADD_TALK: 'ADD_TALK',
    TOGGLE_LIKE_TALK: 'TOGGLE_LIKE_TALK'
}

function receiveTalksActionCreator(talks){
    return{
        type: ActionType.RECEIVE_TALKS,
        payload: {
            talks
        }
    }
}

function addTalkActionCreator(talk){
    return{
        type: ActionType.ADD_TALK,
        payload: {
            talk
        }
    }
}

function toggleLikeTalkActionCreator({talkId, userId}){
    return{
        type: ActionType.TOGGLE_LIKE_TALK,
        payload: {
            talkId,
            userId
        }
    }
}

function asyncAddTalk({text, replyTo = ''}){
    return async (disptach) => {
        try {
            const talk = await api.createTalk({text, replyTo});
            disptach(addTalkActionCreator(talk))
        } catch (error) {
            alert(error.message)
        }
    }
}

function asyncToggleLikeTalk(talkId){
    return async (disptach, getState) => {
        const {authUser} = getState();
        disptach(toggleLikeTalkActionCreator({talkId, userId: authUser.id}))
        try {
            await api.toggleLikeTalk(talkId)
        } catch (error) {
            alert(error.message);
            disptach(toggleLikeTalkActionCreator({talkId, userId: authUser.id}))
        }
    }
}

export {
    ActionType,
    addTalkActionCreator,
    receiveTalksActionCreator,
    toggleLikeTalkActionCreator,
    asyncAddTalk,
    asyncToggleLikeTalk
}