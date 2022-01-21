import chatActionType from './chat-action-type'

const INITIAL_STATE_LIST = {
    list: [],
    error: null
}
const INITIAL_STATE_CHATS = {
    chats: {},
    error: null
}

const chatListReducer = (state = INITIAL_STATE_LIST, { type, payload }) => {
    switch (type) {
        case chatActionType.CHAT_LIST_FETCH_SUCCESS:
            return {
                ...state,
                list: payload,
                error: null
            }
        case chatActionType.CHECK_CHAT_LIST:
            const { receiver, sender, message, openFriend } = payload;
            const isInChatList = state.list.findIndex(obj => obj._id == receiver)
            if (isInChatList > -1) { // If it is in chat list
                if (isInChatList == 0) {
                    return state
                }
                const list = [...state.list]
                const listItem = list.splice(isInChatList, 1)
                listItem.message = message;
                return {
                    list: [listItem, ...list],
                    error: null
                }
            }
            // if it not in list
            const newObj = {
                _id: receiver,
                sender: sender,
                receiver: openFriend._id,
                message: message,
                sent: new Date(),
                delivered: null,
                seen: null,
                unseen: 0,
                friend: {
                    ...openFriend
                    // name: openFriend.name,
                    // image: openFriend.image,
                    // _id: openFriend._id,
                    // username: openFriend.username
                }
            }
            return {
                list: [newObj, ...state.list],
                error: null
            }

        case chatActionType.CHAT_LIST_FETCH_FAILURE:
            return {
                ...state,
                // chats: null,
                // list: null,
                error: payload
            }

        default:
            return state
    }
}

const chatReducer = (state = INITIAL_STATE_CHATS, { type, payload }) => {
    switch (type) {
        case chatActionType.CHAT_FETCH_SUCCESS:
            return {
                ...state,
                chats: {
                    ...state.chats,
                    ...payload
                },
                error: null
            }
        case chatActionType.CHAT_SEND_START:
            const newChats = { ...state.chats };
            if (newChats[payload.receiver]) {
                newChats[payload.receiver].push({
                    message: payload.message,
                    _id: null
                })
            } else {
                newChats[payload.receiver] = [];
                newChats[payload.receiver].push({
                    message: payload.message,
                    _id: null
                })
            }

            return {
                ...state,
                chats: {
                    ...state.chats,
                    ...newChats
                },

                error: null
            }

        case chatActionType.ADD_NEW_MESSAGES_SUCCESS:
            let updatedChates = { ...state.chats };
            console.log(payload);
            payload.forEach((data) => {
                if (!!state.chats[data._id]) {
                    updatedChates[data._id] = [
                        ...state.chats[data._id],
                        ...data.message
                    ]
                } else {
                    updatedChates[data._id] = [...data.message]
                }
            })
            return {
                ...state,
                chats: {
                    ...updatedChates
                },

                error: null
            }
        case chatActionType.CHAT_FETCH_FAILURE:
        case chatActionType.CHAT_LIST_FETCH_FAILURE:
            return {
                ...state,
                // chats: null,
                // chatList: null,
                error: payload
            }
        default:
            return state
    }
}

export { chatListReducer, chatReducer };