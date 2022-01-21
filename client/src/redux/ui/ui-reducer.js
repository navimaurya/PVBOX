import uiActionType from "./ui-action-type";

const INITIAL_STATE = {
    addFriend: false,
    main: false


}

const uiReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case uiActionType.ADD_FRIEND_TOGGLE:
            return {
                ...state,
                addFriend: !state.addFriend
            }

        case uiActionType.MAIN_TOGGLE:
            return {
                ...state,
                main: !state.main
            }

        default:
            return state
    }
}
export default uiReducer;