import React, {useState} from "react";
import * as API from '../../api/Api';
import {useQueries} from "react-query";
import ProfileHero from "../../components/user/ProfileHero";
import Layout from "../../components/layout/Layout";
import Quote from "../../components/quote/Quote";
import {QuoteType} from "../../models/quote";
import {queryClient} from "../../index";
import authStore from "../../stores/auth.store";
import {UserType} from "../../models/user";

interface Props {
    user: UserType,
}

const UserProfile: React.FC<Props> = ({user}) => {
    const enableEditing = authStore?.user?.id === user.id;

    const [mostLikedLimit, setMostLikedLimit] = useState(4);
    const [mostRecentLimit, setMostRecentLimit] = useState(4);
    const [likedByUserLimit, setLikedByUserLimit] = useState(4);

    const mostLikedKey = ['fetchMostLikedByUser', mostLikedLimit];
    const mostRecentKey = ['fetchMostRecentByUser', mostRecentLimit];
    const likedByUserKey = ['fetchQuotesLikedByThisUser', likedByUserLimit];

    const [karma, mostLikedQuotes, mostRecentQuotes, quotesLikedByThisUser] = useQueries([
        {
            queryKey: ['fetchUserKarma', 1],
            queryFn: () => API.fetchUserKarma(user.id),
        },
        {
            queryKey: [mostLikedKey, 1],
            queryFn: () => API.fetchTopQuotesByUser(user.id, 1, mostLikedLimit),
        },
        {
            queryKey: [mostRecentKey, 1],
            queryFn: () => API.fetchByUser(user.id, 1, mostRecentLimit),
        },
        {
            queryKey: [likedByUserKey, 1],
            queryFn: () => API.fetchQuotesLikedByUser(user.id, 1, likedByUserLimit),
        }
    ]);

    return (
        <Layout>
            <div className="pb-28">
                {karma.isLoading
                    ? <div className="p-10">
                        <p className="text-center text-alt-orange animate-pulse">Loading...</p>
                    </div>
                    : <>
                        <ProfileHero user={user} karma={karma.data?.data}/>
                        <div className="p-10 mt-6 lg:grid lg:grid-cols-3 lg:space-x-10 lg:w-full">

                            <div className="mb-14">
                                <h1 className="text-2xl text-orange">Most liked quotes</h1>
                                <div className="my-6 flex flex-col justify-items-center">
                                    <div className="space-y-6">
                                        {mostLikedQuotes.isLoading
                                            ? <p className="text-center text-alt-orange animate-pulse">Loading...</p>
                                            : mostLikedQuotes.data?.data?.map((quote: QuoteType, index: number) =>
                                                <Quote quote={quote} key={index} enableEditControls={enableEditing}/>
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
                                                <Quote quote={quote} key={index} enableEditControls={enableEditing}/>
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
                                <h1 className="text-2xl text-orange">Liked by {user.firstName}</h1>
                                <div className="my-6 flex flex-col justify-items-center">
                                    <div className="space-y-6">
                                        {quotesLikedByThisUser.isLoading
                                            ? <p className="text-center text-alt-orange animate-pulse">Loading...</p>
                                            : quotesLikedByThisUser.data?.data?.map((quote: QuoteType, index: number) =>
                                                <Quote quote={quote} key={index} enableEditControls={enableEditing}/>
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
                }
            </div>
        </Layout>
    )
};

export default UserProfile;