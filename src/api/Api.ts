import Axios, {AxiosRequestConfig, AxiosRequestHeaders} from "axios";
import {userStorage} from "../lib/localStorage";

export async function apiRequest<D = Record<string, unknown>, R = unknown>(
    method: "get" | "delete" | "head" | "options" | "post" | "put" | "patch",
    path: string,
    input?: D,
    options?: {
        headers?: AxiosRequestHeaders;
    } & AxiosRequestConfig,
) {
    const token = userStorage.getUser()?.accessToken;
    const headers = token
        ? {Authorization: `Bearer ${token}`, ...options?.headers}
        : options?.headers;
    try {
        return await Axios.request<R>({
            baseURL: process.env.API_URL || 'http://localhost:8000',
            url: path,
            method: method,
            data: input,
            headers: headers,
            withCredentials: true,
        });
    } catch (error: any) {
        return error.response;
    }
}

export * from './UserApi';
export * from './QuotesApi';
