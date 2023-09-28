import React, {useState} from "react";
import * as API from '../../api/Api';
import {useQueries} from "react-query";
import Quote from "../quote/Quote";
import {QuoteType} from "../../models/quote";
import {queryClient} from "../../index";
import useMobileDetect from "../../hooks/useMobileDetect";

const Dashboard: React.FC = () => {
    const {isMobile} = useMobileDetect(990);
    const [mostLikedLimit, setMostLikedLimit] = useState(isMobile ? 4 : 8);
    const [mostRecentLimit, setMostRecentLimit] = useState(isMobile ? 4 : 8);
    const mostRecentQueryKey = ['fetchMostRecentQuotes', mostRecentLimit];
    const mostLikedQueryKey = ['fetchMostLikedQuotes', mostLikedLimit];
    const [quoteOfTheDay, mostLiked, mostRecent] = useQueries([
        {
            queryKey: ['fetchQuoteOfTheDay', 1],
            queryFn: () => API.fetchQuoteOfTheDay(),
        },
        {
            queryKey: mostLikedQueryKey,
            queryFn: () => API.fetchTopQuotes(1, mostLikedLimit),
        },
        {
            queryKey: mostRecentQueryKey,
            queryFn: () => API.fetchQuotes(1, mostRecentLimit),
        },
    ]);

    return (
        <div className="p-10 pb-28">
            <div className="my-4">
                <h1 className="text-center text-orange text-3xl lg:text-4xl lg:font-extralight">Quote of the Day</h1>
                <p className="text-center mx-4 mt-4">A randomly chosen quote, written by one of our users.</p>
                <div className="mt-8 lg:grid lg:grid-cols-3 lg:space-x-10 lg:w-full">
                    <div className="lg:col-start-2">
                        {quoteOfTheDay.isLoading
                            ? <p className="text-center text-alt-orange animate-pulse">Loading...</p>
                            : <Quote quote={quoteOfTheDay.data?.data} key={quoteOfTheDay.data?.data?.id}/>
                        }
                    </div>
                </div>
            </div>

            <div className="my-4 mt-20">
                <h1 className="text-center text-orange text-3xl lg:text-4xl lg:font-extralight">Most Liked Quotes</h1>
                <p className="text-center mx-4 mt-4">The top quotes on the platform.</p>
                <div className="mt-8 space-y-6 lg:grid lg:grid-cols-3 lg:space-x-10 lg:w-full">
                    {mostLiked.isLoading
                        ? <p className="text-center text-alt-orange animate-pulse">Loading...</p>
                        : mostLiked.data?.data?.map((quote: QuoteType, index: number) =>
                            <Quote quote={quote} key={index}/>
                        )}
                </div>
                <div className="flex justify-center mt-8">
                    <button onClick={() => {
                        setMostLikedLimit(mostLikedLimit + 3);
                        queryClient.invalidateQueries(mostLikedQueryKey).then(_ => {});
                    }}>
                        <p className="inline bg-lighter-gray
                                      py-2.5 px-8 rounded-full mt-6 text-orange cursor-pointer
                                      drop-shadow-sm-ext hover:shadow-darkener active:brightness-90">
                            Load More
                        </p>
                    </button>
                </div>
            </div>

            <div className="my-4 mt-20">
                <h1 className="text-center text-orange text-3xl lg:text-4xl lg:font-extralight">Most Recent Quotes</h1>
                <p className="text-center mx-4 mt-4">Find the fresh gems before others do.</p>
                <div className="mt-8 space-y-6 lg:grid lg:grid-cols-3 lg:space-x-10 lg:w-full">
                    {mostRecent.isLoading
                        ? <p className="text-center text-alt-orange animate-pulse">Loading...</p>
                        : mostRecent.data?.data?.map((quote: QuoteType, index: number) =>
                            <Quote quote={quote} key={index}/>
                        )}
                </div>
                <div className="flex justify-center mt-8">
                    <button onClick={() => {
                        setMostRecentLimit(mostRecentLimit + 3);
                        queryClient.invalidateQueries(mostRecentQueryKey).then(_ => {});
                    }}>
                        <p className="inline bg-lighter-gray
                                      py-2.5 px-8 rounded-full mt-6 text-orange cursor-pointer
                                      drop-shadow-sm-ext hover:shadow-darkener active:brightness-90">
                            Load More
                        </p>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
