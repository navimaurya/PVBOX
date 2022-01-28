import React from "react";
import ProfileSidebar from "../../components/profile-sidebar/profile-sidebar.component";
import ProfileBody from "../../components/profile-body/profile-body.component";
import MainLayout from "../../components/main-layout";

const ProfilePage = () => (
    <>
        {/* <ProfileSidebar /> */}
        <MainLayout visible={true}>
            <ProfileBody />
        </MainLayout>
        {/* <main className="main main-visible">
            <ProfileBody />
        </main> */}
    </>
);

export default ProfilePage;