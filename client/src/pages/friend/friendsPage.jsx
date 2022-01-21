import React, { useState, useEffect } from "react";
import FirendSidebar from "../../components/friend-sidebar/friend-sidebar.component";
import FriendBody from "../../components/firend-body/firend-body.component";
import MainLayout from "../../components/main-layout";

const FriendsPage = () => {
    const [viewFriend, setViewFriend] = useState(null)
    return (
        <>
            <FirendSidebar viewFriend={setViewFriend} />
            <MainLayout>
                <FriendBody viewFriend={viewFriend} />
            </MainLayout>
            {/* <main className="main main-visible">
            <FriendBody viewFriend={viewFriend}/>
        </main> */}
        </>
    )
}

export default FriendsPage;