import React from "react";
import * as API from '../api/Api';
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import UserProfile from "../components/user/UserProfile";

const UserProfilePage: React.FC = () => {
    const {userId} = useParams();

    const user = useQuery({
        queryKey: ['fetchUserById', 1],
        queryFn: () => API.fetchUserById(userId!),
        keepPreviousData: false
    });

    return user.isLoading
        ? <div className="p-10">
            <p className="text-center text-alt-orange animate-pulse">Loading...</p>
        </div>
        : (user.isFetched && user
                ? <UserProfile user={user.data?.data}/>
                : <div className="p-10 pb-28">
                    <p className="text-center">User Not Found</p>
                </div>
        );
}

export default UserProfilePage;
