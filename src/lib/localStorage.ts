import {UserType} from "../models/user";

export const userStorage = {
    getUser: (): UserType => {
        if (typeof window === 'undefined') return {} as UserType;
        return JSON.parse(window.localStorage.getItem('user') as string) as UserType;
    },
    setUser: (user: UserType): void => {
        window.localStorage.setItem('user', JSON.stringify(user));
    },
    clearUser: (): void => {
        window.localStorage.removeItem('user');
    },
};
