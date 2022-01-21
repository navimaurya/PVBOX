import { combineReducers } from "redux";
import userReducer from "./user/user-reducer";
import { chatListReducer, chatReducer } from "./chat/chat-reducer";
import opeChatReducer from "./opend-chat/open-chat-reducer";
import uiReducer from "./ui/ui-reducer";
import friendReducer from "./friends/friend-reducer";
import callReducer from "./calling/calling-reducer";

const rootReducer = combineReducers({
    user: userReducer,
    chat: chatReducer,
    chatList: chatListReducer,
    openChat: opeChatReducer,
    friends: friendReducer,
    call: callReducer,
    ui: uiReducer
})

export default rootReducer;