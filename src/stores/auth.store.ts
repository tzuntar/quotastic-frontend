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

const authStore = new AuthStore();
export default authStore;
