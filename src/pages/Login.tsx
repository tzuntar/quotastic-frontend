import React from "react";
import Layout from "../components/layout/Layout";
import LoginForm from "../components/user/LoginForm";
import {Link} from "react-router-dom";
import {routeConstants} from "../constants/routeConstants";

const Login: React.FC = () => {
    return (
        <Layout isVerticallyCentered={true}>
            <div className="grid grid-cols-1 lg:grid-cols-3 items-center text-center">
                <div className="lg:col-start-2">
                    <h1 className="text-4xl">Welcome <span className="text-orange">back</span></h1>
                    <p className="my-2 mx-6 lg:max-w-sm">Thank you for coming back. We hope you have a great day and
                        inspire others.</p>
                    <div className="p-6"><LoginForm/></div>
                    <p>Don't have an account yet? <Link to={routeConstants.SIGNUP}
                                                        className="text-alt-orange hover:underline">Create it
                        here</Link></p>
                </div>
            </div>
        </Layout>
    )
}

export default Login;
