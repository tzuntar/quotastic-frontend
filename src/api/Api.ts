import Axios, {AxiosRequestConfig, AxiosRequestHeaders} from "axios";

export async function apiRequest<D = Record<string, unknown>, R = unknown>(
    method: "get" | "delete" | "head" | "options" | "post" | "put" | "patch",
    path: string,
    input?: D,
    options?: {
        headers?: AxiosRequestHeaders;
    } & AxiosRequestConfig,
) {
    try {
        return await Axios.request<R>({
            baseURL: process.env.API_URL || 'http://localhost:8000',
            url: path,
            method: method,
            data: input,
            headers: options?.headers,
            withCredentials: true,
        });
    } catch (error: any) {
        return error.response;
    }
}

export * from './UserApi';
