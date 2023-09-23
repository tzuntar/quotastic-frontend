import React, {useEffect, useState} from "react";
import * as API from '../../api/Api';
import {QuoteType} from "../../models/quote";
import upvote from '../../assets/icons/upvote.png';
import downvote from '../../assets/icons/downvote.png';
import default_avatar from '../../assets/default_avatar.png';
import {useNavigate} from "react-router-dom";
import {routeConstants} from "../../constants/routeConstants";
import authStore from "../../stores/auth.store";

type VoteType = 'upvote' | 'downvote' | null;

interface Props {
    quote: QuoteType;
}

const Quote: React.FC<Props> = ({quote}) => {
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [score, setScore] = useState(quote.reactions?.filter(r => r.type === 'upvote').length || 0);
    const [selectedVote, setSelectedVote] = useState<VoteType>(null);

    const navigate = useNavigate();
    const isLoggedIn = authStore.user !== null;

    useEffect(() => {
        // auto-select the voting button if the user has already voted on this quote
        const userReaction = quote.reactions?.find(r => r.userId === authStore.user?.id);
        if (userReaction)
            setSelectedVote(userReaction.type as VoteType);
    }, [quote.reactions]);

    const handleVote = (voteType: VoteType) => {
        if (!isLoggedIn) return navigate(routeConstants.LOGIN);
        API.vote(quote.id, voteType)
            .then(result => {
                console.log(result);
            });
    }

    return (
        <div className="rounded-card shadow-md p-5">
            <div className="flex flex-row space-x-4 items-center">
                <div className="flex flex-col items-center space-y-1">
                    <button onClick={() => handleVote('upvote')}>
                        <img src={upvote} alt="Upvote" className="max-w-[12px]"/>
                    </button>
                    <p>{quote.reactions?.filter(quote => quote.type === 'upvote').length}</p>
                    <button onClick={() => handleVote('downvote')}>
                        <img src={downvote} alt="Downvote" className="max-w-[12px]"/>
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
