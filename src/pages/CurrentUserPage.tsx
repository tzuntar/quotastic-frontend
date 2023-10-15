import React from "react";
import UserProfile from "../components/user/UserProfile";
import authStore from "../stores/auth.store";

const CurrentUserPage: React.FC = () => {
    if (authStore.user == null)
        return (<></>); // failsafe

    return (
        <UserProfile user={authStore.user!}/>
    )
}

export default CurrentUserPage;
