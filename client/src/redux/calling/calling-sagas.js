import { takeLatest, call, put, all, takeEvery, delay } from "@redux-saga/core/effects";
import axios from "axios";

import callActionType from './calling-action-type'

function* clientIdSendStart({ payload }) {
    console.log(payload, 'from  call saga');
    try {
        const { data } = yield axios.post('/api/updateclientid', {
            socketId: payload
        })
        if (data.status === 'succes') {
            console.log('Client id updted');
        }
    } catch (error) {
        console.log(error);
    }
}
function* getclientStart({ payload }) {
    console.log(payload, 'from  call saga');
    try {
        const { data } = yield axios.post('/api/getclinetid', {
            _id: payload
        })
        if (data.status === 'succes') {
            console.log('Client id fetched');
        }
    } catch (error) {
        console.log(error);
    }
}


export function* onClinetIdSendStarter() {
    yield takeLatest(callActionType.CLIENT_ID_SEND_START, clientIdSendStart)
}
export function* ongetclientStart() {
    yield takeLatest(callActionType.CLIENT_ID_FETCH_START, getclientStart)
}
// Export friend Sagas
export function* callSagas() {
    yield all([
        call(onClinetIdSendStarter),
        // call(ongetclientStart)
    ])
}




