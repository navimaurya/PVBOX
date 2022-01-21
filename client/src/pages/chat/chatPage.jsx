import React from "react";
import { connect } from "react-redux";

import MainLayout from "../../components/main-layout";
import ChatBody from "../../components/chat-body/chat-body.component";
import ChatSideBar from "../../components/chat-sidebar/chat-sidebar.component";
import Empty from "../../components/empty/empty.component";
import './chatPage.style.css'

const ChatPage = ({ match, isOpened }) => (
    <>
        <ChatSideBar />
        <MainLayout >
            {isOpened ? <ChatBody />
                : <Empty />}
        </MainLayout>
        {/* <ChatSideBar />
        <main className="main main-visible">
            {
                isOpened ? <ChatBody />
                    : <Empty />
            }
        </main> */}
    </>
)
const mapStateToProps = state => ({
    isOpened: state.openChat.friend
});

export default connect(mapStateToProps)(ChatPage);