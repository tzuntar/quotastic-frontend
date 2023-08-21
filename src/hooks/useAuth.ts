import {useNavigate} from 'react-router-dom';
import authStore from "../stores/auth.store";
import {useEffect, useRef} from "react";
import {routeConstants} from "../constants/routeConstants";
import {clearInterval} from "timers";
import {userStorage} from "../lib/localStorage";
import {StatusCode} from "../constants/statusCodeConstants";
import * as API from "../api/Api";

const useAuth = () => {
    const navigate = useNavigate();
    const user = authStore.user;
    const timerRef = useRef<any>(null);

    const refreshTokens = async () => {
        const response = await API.refreshTokens();

        if (response.data.statusCode === StatusCode.UNAUTHORIZED
            || response.data.statusCode === StatusCode.FORBIDDEN) {
            await API.logout();
            authStore.logout();
            navigate(routeConstants.HOME);
            return;
        }

        authStore.login(response.data);
    }

    useEffect(() => {
        if (!userStorage.getUser()) return;
        (async () => {
            const response = await API.getCurrentUser();
            if (response.data.email) {
                authStore.login(response.data);
                clearInterval(timerRef.current);
                timerRef.current = setInterval(refreshTokens, 840_000);
            } else if (response.data.statusCode === StatusCode.UNAUTHORIZED) {
                authStore.logout();
                navigate(routeConstants.HOME);
            }
        })();
    }, []);

    useEffect(() => {
        if (!user) return;
        clearInterval(timerRef.current);
        timerRef.current = setInterval(refreshTokens, 840_000)
    });
};

export default useAuth;
