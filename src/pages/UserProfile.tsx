import React from "react";
import * as API from '../api/Api';
import {useParams} from "react-router-dom";
import {useQueries} from "react-query";
import ProfileHero from "../components/user/ProfileHero";
import Layout from "../components/layout/Layout";
import {StatusCode} from "../constants/statusCodeConstants";

function missingUserTemplate() {
    return (
        <div className="p-10 pb-28">
            <p className="text-center">User Not Found</p>
        </div>
    )
}

const UserProfile: React.FC = () => {
    const {userId} = useParams();
    const [user, karma] = useQueries([
        {
            queryKey: ['fetchUserById', 1],
            queryFn: () => API.fetchUserById(userId!),
        },
        {
            queryKey: ['fetchUserKarma', 1],
            queryFn: () => API.fetchUserKarma(userId!),
        }
    ]);
    if (!user) return missingUserTemplate();

    return (
        <Layout>
            <div className="pb-28">
                {user.isLoading
                    ? <div className="p-10">
                        <p className="text-center text-alt-orange animate-pulse">Loading...</p>
                    </div>
                    : user.data?.status === StatusCode.OK
                        ? <>
                            <ProfileHero user={user.data?.data} karma={karma.data?.data}/>
                            <div className="p-10 mt-6">
                                <h1 className="text-2xl text-orange">Most liked quotes</h1>
                                <h1 className="text-2xl text-orange">Most recent quotes</h1>
                                <h1 className="text-2xl text-orange">Liked by {user.data?.data?.firstName}</h1>
                            </div>
                        </>
                        : missingUserTemplate()
                }
            </div>
        </Layout>
    )
};

export default UserProfile;