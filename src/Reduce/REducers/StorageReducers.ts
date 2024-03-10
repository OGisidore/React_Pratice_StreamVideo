import { Notification } from "../../models/Notification";
import { ADD, CLEAR, NotifiacationAction, REMOVE } from "../types/action";

const iniState = {
    notifications: []
}
const initAction = {
    type: null,
    payload: null
}

export const storageReducers = (
    state = iniState,
    action: NotifiacationAction = initAction) => {
    switch (action.type) {
        case ADD:
            return {
                notifications: [...state.notifications, action.payload]
            }

            break;
        case REMOVE:
            state.notifications = state.notifications.filter(
                (notif: Notification) => 
                    notif._id !== action.payload?._id
                
            )
            return {
                notifications: [...state.notifications]
            }
            break;
        case CLEAR:
            return {
                ...iniState
            }

            break;

        default:
            return {
                ...state
            }
            break;
    }

}