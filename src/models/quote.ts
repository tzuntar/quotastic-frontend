import {UserType} from "./user";

export type QuoteType = {
    id: string;
    body: string;
    cachedScore?: number;
    user: UserType;
    reactions?: QuoteReactionType[];
}

export type QuoteReactionType = {
    id: string;
    type: string;
    user?: UserType;
}
