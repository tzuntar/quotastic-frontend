import authStore from "../stores/auth.store";
import {observer} from "mobx-react";
import React, {FC} from "react";
import {Navigate, RouteProps, useLocation} from "react-router-dom";

const PrivateRoute: FC<RouteProps> = ({children}: RouteProps) => {
    const location = useLocation();
    if (!authStore.user)
        return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`}/>;
    return children as React.ReactElement;
};

export default observer(PrivateRoute);
