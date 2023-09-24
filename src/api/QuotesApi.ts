import {apiRequest} from "./Api";
import {apiRoutes} from "../constants/apiConstants";
import {QuoteType} from "../models/quote";
import {CreateUpdateQuoteFields} from "../hooks/react-hook-form/useCreateUpdateQuote";

export const fetchQuotes = async (pageNumber: number, limit: number) =>
    apiRequest<undefined, QuoteType[]>('get', `${apiRoutes.QUOTES_PREFIX}?page=${pageNumber}&limit=${limit}`);

export const fetchTopQuotes = async (pageNumber: number, limit: number) =>
    apiRequest<undefined, QuoteType[]>('get', `${apiRoutes.QUOTES_PREFIX}/top?page=${pageNumber}&limit=${limit}`);

// fetchRecentQuotes, fetchByUser?

export const createQuote = async (data: CreateUpdateQuoteFields) =>
    apiRequest<CreateUpdateQuoteFields, QuoteType>('post', `/me/myquote`, data);

export const updateQuote = async (data: CreateUpdateQuoteFields, id: string) =>
    apiRequest<CreateUpdateQuoteFields, QuoteType>('patch', `/me/myquote/${id}`, data);

export const deleteQuote = async (id: string) =>
    apiRequest<string, QuoteType>('delete', `${apiRoutes.QUOTES_PREFIX}/${id}`);

export const vote = async (id: string, voteType?: "upvote" | "downvote" | null) =>
    apiRequest<string, QuoteType | void>('post', `${apiRoutes.QUOTES_PREFIX}/${id}/vote?vote=${voteType}`);