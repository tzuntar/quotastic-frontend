import React from "react";
import * as API from '../../api/Api';
import teaser_quotes from "../../assets/landing_page/teaser_quotes.png";
import {Link} from "react-router-dom";
import {useQuery} from "react-query";
import {QuoteType} from "../../models/quote";
import Quote from "../quote/Quote";
import {routeConstants} from "../../constants/routeConstants";
import authStore from "../../stores/auth.store";

const LandingHome: React.FC = () => {
    const quote = useQuery({
        queryKey: ['fetchTopQuotes', 1],
        queryFn: () => API.fetchTopQuotes(1, 5),
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });

    return (
        <div className="p-10 pb-28">

            <div id="intro" className="lg:flex lg:flex-row lg:items-center lg:justify-around">
                <div id="intro_text" className="lg:max-w-sm">
                    <h1 className="text-3xl lg:text-6xl lg:font-extralight">Welcome<br/>to <span
                        className="text-orange">Quotastic</span></h1>
                    <p className="py-5 text-lg mb-4">Quotastic is a free online platform, built for those who love
                        quips, quotes, and proverbs. Join the community and express yourself through creative
                        writing.</p>

                    <Link to={routeConstants.SIGNUP}>
                        <p className="inline bg-orange
                              py-2.5 px-8 rounded-full mt-6 text-white cursor-pointer
                              drop-shadow-md hover:shadow-lightener active:brightness-90">
                            Join Our Community
                        </p>
                    </Link>
                </div>
                <img src={teaser_quotes} alt="User generated quotes" className="pt-5 mt-10 lg:max-w-xs"/>
            </div>

            <h1 className="text-3xl text-center pt-14 lg:pt-28 lg:pb-6 lg:text-5xl lg:font-extralight">Explore the world
                of <span className="lg:text-orange lg:block">fantastic quotes</span></h1>
            <h2 className="text-2xl text-orange text-center pt-10 lg:text-3xl lg:font-extralight">Most liked quotes</h2>
            <p className="text-center py-5 pb-10 lg:max-w-sm lg:mx-auto">Most liked quotes on the platform. Sign in or
                create an account to like and save your favorites.</p>

            <div className="mb-10">
                <div id="quotes_grid"
                     className="lg:grid lg:grid-cols-3 lg:space-x-10 space-y-6 lg:space-y-10 lg:w-full lg:h-full">
                    {quote.isLoading
                        ? <p className="text-center text-alt-orange animate-pulse">Loading...</p>
                        : quote.data?.data?.map((quote: QuoteType, index: number) =>
                            <Quote quote={quote} key={index}/>
                        )}
                </div>
            </div>

            {authStore.user === null &&
                <div className="flex justify-center">
                    <Link to={routeConstants.LOGIN}>
                        <p className="inline bg-lighter-gray
                                      py-2.5 px-8 rounded-full mt-6 text-orange cursor-pointer
                                      drop-shadow-sm-ext hover:shadow-darkener active:brightness-90">
                            Sign In to See More
                        </p>
                    </Link>
                </div>
            }

        </div>
    )
}

export default LandingHome;
