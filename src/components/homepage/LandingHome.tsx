import React from "react";
import * as API from '../../api/Api';
import teaser_quotes from "../../assets/landing_page/teaser_quotes.png";
import {useNavigate} from "react-router-dom";
import {useQueries} from "react-query";
import {QuoteType} from "../../models/quote";
import Quote from "../quote/Quote";

const LandingHome: React.FC = () => {
    const navigate = useNavigate();
    const [quote] = useQueries([
        {
            queryKey: ['fetchTopQuotes', 1],
            queryFn: () => API.fetchTopQuotes(1, 5),
            keepPreviousData: true,
            refetchOnWindowFocus: false,
        }
    ]);

    return (
        <div className="p-10">
            <h1 className="text-3xl">Welcome<br/>to <span className="text-orange">Quotastic</span></h1>
            <p className="py-5 text-lg">Quotastic is a free online platform, built for those who love quips, quotes, and
                proverbs. Join the community and express yourself through creative writing.</p>
            {/*ToDo: the following*/}
            <button>Join Our Community</button>
            <img src={teaser_quotes} alt="User generated quotes" className="pt-5"/>
            <h1 className="text-3xl text-center pt-14">Explore the world of fantastic quotes</h1>
            <h2 className="text-2xl text-orange text-center pt-10">Most liked quotes</h2>
            <p className="text-center py-5 pb-10">Most liked quotes on the platform. Sign in or create an account to like
                and save your favorites.</p>

            {quote.isLoading ? (
                <p className="text-center text-alt-orange animate-pulse">Loading...</p>
            ) : (
                <>
                    {quote.data?.data?.map((quote: QuoteType, index: number) => (
                        <Quote quote={quote} key={index}/>
                    ))}
                </>
            )}

        </div>
    )
}

export default LandingHome;