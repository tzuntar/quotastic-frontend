import React, {useMemo, useState} from "react";
import * as API from '../../api/Api';
import {QuoteType} from "../../models/quote";
import upvote from '../../assets/icons/upvote.png';
import upvote_selected from '../../assets/icons/upvote_selected.png';
import downvote from '../../assets/icons/downvote.png';
import downvote_selected from '../../assets/icons/downvote_selected.png';
import default_avatar from '../../assets/default_avatar.png';
import {useNavigate} from "react-router-dom";
import {routeConstants} from "../../constants/routeConstants";
import authStore from "../../stores/auth.store";
import {StatusCode} from "../../constants/statusCodeConstants";

type VoteType = 'upvote' | 'downvote' | null;

interface Props {
    quote: QuoteType;
}

const Quote: React.FC<Props> = ({quote}) => {
    const initialScore = useMemo(() => {
        return quote.reactions?.filter(r => r.type === 'upvote').length || 0
    }, [quote.reactions]);
    const initialVote = useMemo(() => {
        return quote.reactions?.find(r => r.user?.id === authStore.user?.id);
    }, [quote.reactions]);

    const [score, setScore] = useState(initialScore);
    // auto-select the voting button if the user has already voted on this quote
    const [selectedVote, setSelectedVote] = useState<VoteType>(initialVote?.type as VoteType);

    const navigate = useNavigate();
    const isLoggedIn = authStore.user !== null;

    const handleVote = async (voteType: VoteType) => {
        if (!isLoggedIn) return navigate(routeConstants.LOGIN);
        const result = await API.vote(quote.id, voteType);
        if (result.status === StatusCode.OK || result.status === StatusCode.CREATED) {
            setScore(result.data);
            setSelectedVote(voteType);
        }
    }

    return (
        <div className="rounded-card shadow-md p-5">
            <div className="flex flex-row space-x-4 items-center">
                <div className="flex flex-col items-center space-y-1">
                    <button onClick={() => handleVote('upvote')}>
                        <img src={selectedVote === 'upvote' ? upvote_selected : upvote} alt="Upvote"
                             className="max-w-[12px]"/>
                    </button>
                    <p>{score}</p>
                    <button onClick={() => handleVote('downvote')}>
                        <img src={selectedVote === 'downvote' ? downvote_selected : downvote} alt="Downvote"
                             className="max-w-[12px]"/>
                    </button>
                </div>
                <div className="space-y-2">
                    <p>{quote.body}</p>
                    <p className="text-xs pt-2">
                        <img src={
                            quote.user?.avatarUrl !== null
                                ? quote.user?.avatarUrl
                                : default_avatar
                        } alt="Avatar" className="w-6 inline mr-2 drop-shadow-md"/>
                        {quote.user.firstName} {quote.user.lastName}</p>
                </div>
            </div>
        </div>
    )
}

export default Quote;
