import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import authStore from "../stores/auth.store";
import {routeConstants} from "../constants/routeConstants";

const Logout: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        authStore.logout();
        navigate(routeConstants.HOME);
    }, [navigate]);

    return <></>
};

export default Logout;
