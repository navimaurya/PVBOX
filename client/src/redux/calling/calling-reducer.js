import callingActionType from './calling-action-type'


const INITIAL_STATE = {
    outgoingcall: null,
    incomingcall: null,
    incall: null,
    error: null
}

const callReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case callingActionType.OUTGOING_CALL_START:
            return {
                ...state,
                outgoingcall: {
                    ...payload
                },
                incall: payload,
                incomingcall: null,
                error: null
            }
        case callingActionType.INCOMING_CALL_START:
            return {
                ...state,
                incomingcall: {
                    ...payload
                },
                outgoingcall: null,
                error: null
            }
        case callingActionType.ANSWER_CALL:
            return {
                ...state,

                outgoingcall: null,
                incall: {
                    ...state?.incomingcall,
                    ...payload
                },
                error: null
            }
        case callingActionType.DISCONNECT_CALL:
            return {
                ...state,
                outgoingcall: null,
                incomingcall: null,
                incall: null,
                error: null
            }
        default:
            return state
    }
}

export default callReducer;