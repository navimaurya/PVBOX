import React, { useEffect } from "react";

import { Route } from 'react-router-dom'
import { connect } from 'react-redux';
import { BrowserView } from 'react-device-detect'

// import HomePage from './pages/home/home';
import ChatPage from './pages/chat/chatPage';
import CallPage from './pages/call/callPage';
import FriendsPage from './pages/friend/friendsPage';
import ProfilePage from './pages/profile/profilePage';
import Navigation from './components/navigation/navigation.component';
import AddFriend from './components/addFriend/addFriend.component';
// import CallWidget from './pages/call-widget/call-widget'
// import IncomingCall from './components/incoming-call/incoming-call';
// import CallHandler from './components/call-handler/call-handler'

// import CallDialog from './components/call-dialog/call-dialog.component';

import { appStarterStart } from './redux/starter/starter-action';
import { addNewMessagesStart } from './redux/chat/chat-action';
import { getLoggedInUserStart } from './redux/user/user-action';
import { getFriendListStart } from './redux/friends/friend-action';

const AppStarter = ({ appStarterStart, isLogedIn, getFriendListStart, addNewMessagesStart }) => {
    useEffect(() => { // ComponentDidMount
        setTimeout(() => {
            console.log(isLogedIn);
        }, 3000);
        appStarterStart();

        getFriendListStart()
    }, [])
    useEffect(() => { // ComponentDidUpdate
        addNewMessagesStart();
    })
    return (
        <>
            <Navigation />

            <Route path='/' exact component={ChatPage} />
            <Route path='/chats' component={ChatPage} />
            <BrowserView>
                <Route path='/calls' component={CallPage} />
            </BrowserView>
            <Route path='/friends' component={FriendsPage} />
            <Route path='/profile' component={ProfilePage} />


            {/* Gloable call */}
            {/* <CallWidget /> */}
            {/* <CallHandler /> */}
            {/* Featurs tab */}
            <AddFriend />
            {/* <IncomingCall /> */}
        </>
    )
}
const mapDispatchToProps = dispatch => ({
    addNewMessagesStart: () => dispatch(addNewMessagesStart()),
    appStarterStart: () => dispatch(appStarterStart()),
    getFriendListStart: () => dispatch(getFriendListStart())

})

export default connect(null, mapDispatchToProps)(AppStarter);
