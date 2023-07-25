import {useEffect} from "react";
import {useLocation} from "react-router-dom";

const onDefault = () => {
    document.title = "Quotastic";
    document.body.id = "";
};
const onHome = () => {
    document.title = "Quotastic";
    document.body.id = "home-page";
};
const onQuotes = () => {
    document.title = "Quotastic • Top Quotes";
    document.body.id = "dashboard-page";
};
const onLogin = () => {
    document.title = "Quotastic • Sign In";
    document.body.id = "login-page";
};
const onSignup = () => {
    document.title = "Quotastic • Create Account";
    document.body.id = "signup-page";
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const callbacks: any = {
    "/": [onHome],
    "/quotes": [onQuotes],
    "/login": [onLogin],
    "/signup": [onSignup],
    "*": [onDefault],
};
export const usePageIdentification = () => {
    const location = useLocation();

    const customSwitch = (value: string) => {
        if (callbacks[value]) {
            callbacks[value].forEach((fn: () => void) => {
                fn();
            });
        } else {
            onDefault();
        }
    };

    useEffect(() => {
        if (location.pathname) customSwitch(location.pathname);
    }, [location.pathname]);
};
