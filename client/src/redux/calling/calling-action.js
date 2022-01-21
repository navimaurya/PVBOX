import callActionType from "./calling-action-type";

// Client Id 
export const clientIdSendStart = (id) => ({
    type: callActionType.CLIENT_ID_SEND_START,
    payload: id
})

// export const clientIdSendSuccess = chats => ({
//     type: callActionType.CLIENT_ID_SEND_SUCCESS,
//     payload: chats
// })

// export const clientIdSendFailure = (error) => ({
//     type: callActionType.CLIENT_ID_SEND_FAILURE,
//     payload: error
// })


// call
export const outgoingCallStart = (data) => ({
    type: callActionType.OUTGOING_CALL_START,
    payload: data
})

export const incomingCallStart = data => ({
    type: callActionType.INCOMING_CALL_START,
    payload: data
})

export const disconnetCall = () => ({
    type: callActionType.DISCONNECT_CALL,
})

export const answerCall = (data = {}) => ({
    type: callActionType.ANSWER_CALL,
    payload: data,
})

