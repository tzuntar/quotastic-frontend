import React, {FC, lazy, Suspense} from "react";
import {Route, RouteProps, Routes as Switch} from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import RestrictedRoute from "./RestrictedRoute";

export enum RouteType {
    PUBLIC,
    PRIVATE,
    RESTRICTED,
}

type AppRoute = RouteProps & {
    type?: RouteType;
};

/* Public routes */
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Registration = lazy(() => import("../pages/Registration"));

/* Private routes */
//const UserPrefs = lazy(() => import("pages/User/Preferences"));
//const Quotes = lazy(() => import("pages/Quotes"));

/* Restricted routes */

/* Error routes */
const NotFound404 = lazy(() => import("../pages/Errors/NotFound404"));

export const AppRoutes: AppRoute[] = [
    // Restricted Routes
/*    // Private Routes
    {
        type: RouteType.PRIVATE,
        path: "/me/preferences",
        children: <UserPrefs/>,
    },
    {
        type: RouteType.PRIVATE,
        path: "/quotes",
        children: <Quotes/>,
    },*/
    // Public Routes
    {
        type: RouteType.PUBLIC,
        path: "/",
        children: <Home/>,
    },
    {
        type: RouteType.PUBLIC,
        path: "/login",
        children: <Login/>,
    },
    {
        type: RouteType.PUBLIC,
        path: "/signup",
        children: <Registration/>,
    },
    // 404 Not Found
    {
        type: RouteType.PUBLIC,
        path: "*",
        children: <NotFound404/>,
    },
];

const Routes: FC = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                {AppRoutes.map((r) => {
                    const {type} = r;
                    if (type === RouteType.PRIVATE) {
                        return (
                            <Route
                                key={`${r.path}`}
                                path={`${r.path}`}
                                element={<PrivateRoute>{r.children}</PrivateRoute>}
                            />
                        );
                    }
                    if (type === RouteType.RESTRICTED) {
                        return (
                            <Route
                                key={`${r.path}`}
                                path={`${r.path}`}
                                element={<RestrictedRoute>{r.children}</RestrictedRoute>}
                            />
                        );
                    }

                    return <Route key={`${r.path}`} path={`${r.path}`} element={r.children}/>;
                })}
                <Route path="*" element={<NotFound404/>}/>
            </Switch>
        </Suspense>
    );
};

export default Routes;
