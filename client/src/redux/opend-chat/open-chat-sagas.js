import { takeLatest, all, call, put } from 'redux-saga/effects'
import openChatActionType from './open-chat-action-type'
import { chatFetchStart } from '../chat/chat-action'
import { selectChats } from '../chat/chat-selector'
import store from '../store'

function* chatOpenStart({ payload: { _id } }) {
    // console.log("Hello");
    const isLoaded = Object.keys((selectChats(store.getState()))).includes(_id);
    console.log("Open Chat Start Saga", isLoaded);
    if (!isLoaded) {
        yield put(chatFetchStart(_id));
    }
}

function* onChatOpenStart() {
    yield takeLatest(openChatActionType.CHAT_OPEN_START, chatOpenStart)
}

export function* openChatSagas() {
    yield all([
        call(onChatOpenStart),
    ])
}