import React from "react";
import moment from 'moment';

const MessageDay = ({ day, children }) => {
    day = (moment(day).calendar()).split(' ')[0]
    return (
        <div className="message-day">
            <div className="message-divider sticky-top pb-2" data-label={day}>&nbsp;</div>
            {children}
        </div>
    )
}

export default MessageDay;
