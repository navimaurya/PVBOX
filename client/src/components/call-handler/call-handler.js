import React, { useEffect } from "react";
import { connect } from "react-redux";

import CallWidget from "../../pages/call-widget/call-widget";

const callHandler = ({ incomingCall, outgoingCall, incall, currentUser }) => {
    return (
        <>
            {
                outgoingCall || incall ? <CallWidget />
                    : <></>
            }
        </>
    )
}

const mapStateToProps = state => ({
    incomingCall: state.call.incomingcall,
    outgoingCall: state.call.outgoingcall,
    incall: state.call.incall,
    currentUser: state.user.currentUser,
})
export default connect(mapStateToProps)(callHandler);
