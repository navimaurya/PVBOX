import React, { Component, useRef, useState, useEffect, memo } from 'react'
import { FileIcon, defaultStyles } from 'react-file-icon';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectChats } from '../../redux/chat/chat-selector';
import { selectOpenChatFriend } from '../../redux/opend-chat/open-chat-selector';
import { chatFetchStart } from '../../redux/chat/chat-action';

import MessageDay from '../message-day/message-day.component';
import Message from '../message/message.component';

const MessageBody = ({ chats, state, chatFetchStart, activeChat }) => {
    const ref = useRef(null)
    const messageEl = useRef(null);
    const usersChats = chats[state._id]
    useEffect(() => {
        if (!chats[state._id]) {
            const id = activeChat._id;
            chatFetchStart(id)
        }

        ref.current.scrollIntoView()
        if (messageEl) {
            messageEl.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight });
            });
        }
    }, [chats, activeChat, state])
    // }, [chats, activeChat, state])
    useEffect(() => {
        ref.current.scrollIntoView()
        if (messageEl) {
            messageEl.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight });
            });
        }
    }, [])

    return (<div className="chat-content p-2">
        <div className="container" ref={messageEl}>
            {/* <!-- Message Day Start --> */}
            {
                !!usersChats ?
                    usersChats.map((state, i) => {
                        return (
                            // <MessageDay day={state.sent}>
                            <Message key={i} data={state} />
                            // </MessageDay>
                        )
                    })
                    : (
                        // <MessageDay day={state.sent}>
                        <Message data={state} />
                        // </MessageDay>
                    )
            }
            <div style={{ float: "left" }}
                ref={ref}>
            </div>
        </div>

        {/* <!-- Scroll to finish --> */}
        <div className="chat-finished" id="chat-finished"></div>
    </div>)
}



const mapStateToProps = createStructuredSelector({
    chats: selectChats,
    activeChat: selectOpenChatFriend
})
const mapDispatchToProps = dispatch => ({
    chatFetchStart: (friend) => dispatch((chatFetchStart(friend)))
})

export default connect(mapStateToProps, mapDispatchToProps)(memo(MessageBody));