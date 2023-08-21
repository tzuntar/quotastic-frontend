import {UserType} from "../models/User";
import {userStorage} from "../lib/localStorage";
import {makeAutoObservable} from "mobx";

class AuthStore {
    user?: UserType = userStorage.getUser()

    constructor() {
        makeAutoObservable(this);
    }

    login(user: UserType) {
        userStorage.setUser(user);
        this.user = user;
    }

    logout() {
        userStorage.clearUser();
        this.user = undefined;
    }
}

export const authStore = new AuthStore();
