import React, {useState} from "react";
import * as API from '../api/Api';
import {useParams} from "react-router-dom";
import {useQueries} from "react-query";
import ProfileHero from "../components/user/ProfileHero";
import Layout from "../components/layout/Layout";
import {StatusCode} from "../constants/statusCodeConstants";
import Quote from "../components/quote/Quote";
import {QuoteType} from "../models/quote";
import {queryClient} from "../index";

function missingUserTemplate() {
    return (
        <div className="p-10 pb-28">
            <p className="text-center">User Not Found</p>
        </div>
    )
}

const UserProfile: React.FC = () => {
    const {userId} = useParams();

    const [mostLikedLimit, setMostLikedLimit] = useState(4);
    const [mostRecentLimit, setMostRecentLimit] = useState(4);
    const [likedByUserLimit, setLikedByUserLimit] = useState(4);

    const mostLikedKey = ['fetchMostLikedByUser', mostLikedLimit];
    const mostRecentKey = ['fetchMostRecentByUser', mostRecentLimit];
    const likedByUserKey = ['fetchQuotesLikedByThisUser', likedByUserLimit];

    const [user, karma, mostLikedQuotes, mostRecentQuotes, quotesLikedByThisUser] = useQueries([
        {
            queryKey: ['fetchUserById', 1],
            queryFn: () => API.fetchUserById(userId!),
        },
        {
            queryKey: ['fetchUserKarma', 1],
            queryFn: () => API.fetchUserKarma(userId!),
        },
        {
            queryKey: [mostLikedKey, 1],
            queryFn: () => API.fetchTopQuotesByUser(userId!, 1, mostLikedLimit),
        },
        {
            queryKey: [mostRecentKey, 1],
            queryFn: () => API.fetchByUser(userId!, 1, mostRecentLimit),
        },
        {
            queryKey: [likedByUserKey, 1],
            queryFn: () => API.fetchQuotesLikedByUser(userId!, 1, likedByUserLimit),
        }
    ]);
    if (!user) return missingUserTemplate();

    return (
        <Layout>
            <div className="pb-28">
                {user.isLoading || karma.isLoading
                    ? <div className="p-10">
                        <p className="text-center text-alt-orange animate-pulse">Loading...</p>
                    </div>
                    : user.data?.status === StatusCode.OK
                        ? <>
                            <ProfileHero user={user.data?.data} karma={karma.data?.data}/>
                            <div className="p-10 mt-6 lg:grid lg:grid-cols-3 lg:space-x-10 lg:w-full">

                                <div className="mb-14">
                                    <h1 className="text-2xl text-orange">Most liked quotes</h1>
                                    <div className="my-6 flex flex-col justify-items-center">
                                        <div className="space-y-6">
                                            {mostLikedQuotes.isLoading
                                                ? <p className="text-center text-alt-orange animate-pulse">Loading...</p>
                                                : mostLikedQuotes.data?.data?.map((quote: QuoteType, index: number) =>
                                                    <Quote quote={quote} key={index}/>
                                                )}
                                        </div>
                                        <button className="mt-8" onClick={() => {
                                            setMostLikedLimit(mostLikedLimit + 3);
                                            queryClient.invalidateQueries(mostLikedKey).then(_ => {});
                                        }}>
                                            <p className="inline bg-lighter-gray
                                      py-2.5 px-8 rounded-full text-orange cursor-pointer
                                      drop-shadow-sm-ext hover:shadow-darkener active:brightness-90">
                                                Load More
                                            </p>
                                        </button>
                                    </div>
                                </div>

                                <div className="mb-14">
                                    <h1 className="text-2xl text-orange">Most recent quotes</h1>
                                    <div className="my-6 flex flex-col justify-items-center">
                                        <div className="space-y-6">
                                            {mostRecentQuotes.isLoading
                                                ? <p className="text-center text-alt-orange animate-pulse">Loading...</p>
                                                : mostRecentQuotes.data?.data?.map((quote: QuoteType, index: number) =>
                                                    <Quote quote={quote} key={index}/>
                                                )}
                                        </div>
                                        <button className="mt-8" onClick={() => {
                                            setMostRecentLimit(mostRecentLimit + 3);
                                            queryClient.invalidateQueries(mostRecentKey).then(_ => {});
                                        }}>
                                            <p className="inline bg-lighter-gray
                                      py-2.5 px-8 rounded-full text-orange cursor-pointer
                                      drop-shadow-sm-ext hover:shadow-darkener active:brightness-90">
                                                Load More
                                            </p>
                                        </button>
                                    </div>
                                </div>

                                <div className="mb-14">
                                    <h1 className="text-2xl text-orange">Liked by {user.data?.data?.firstName}</h1>
                                    <div className="my-6 flex flex-col justify-items-center">
                                        <div className="space-y-6">
                                            {quotesLikedByThisUser.isLoading
                                                ? <p className="text-center text-alt-orange animate-pulse">Loading...</p>
                                                : quotesLikedByThisUser.data?.data?.map((quote: QuoteType, index: number) =>
                                                    <Quote quote={quote} key={index}/>
                                                )}
                                        </div>
                                        <button className="mt-8" onClick={() => {
                                            setLikedByUserLimit(likedByUserLimit + 3);
                                            queryClient.invalidateQueries(likedByUserKey).then(_ => {});
                                        }}>
                                            <p className="inline bg-lighter-gray
                                      py-2.5 px-8 rounded-full text-orange cursor-pointer
                                      drop-shadow-sm-ext hover:shadow-darkener active:brightness-90">
                                                Load More
                                            </p>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </>
                        : missingUserTemplate()
                }
            </div>
        </Layout>
    )
};

export default UserProfile;