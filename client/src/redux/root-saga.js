import { all, fork } from 'redux-saga/effects'
import { userSagas } from "./user/user-sagas";
import { chatSagas } from './chat/chat-sagas';
import { appStarterSagas } from './starter/starter-sagas';
import { friendSagas } from './friends/friend-sagas';
import { openChatSagas } from './opend-chat/open-chat-sagas';
import { callSagas } from './calling/calling-sagas';

export default function* rootSaga() {
    yield all([fork(appStarterSagas), fork(userSagas), fork(chatSagas), fork(friendSagas), fork(openChatSagas), fork(callSagas)]);
}