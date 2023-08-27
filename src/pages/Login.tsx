import React, {FC} from "react";
import Layout from "../components/layout/Layout";
import LoginForm from "../components/user/LoginForm";
import {Link} from "react-router-dom";
import {routeConstants} from "../constants/routeConstants";

const Login: FC = () => {
    return (
        <Layout>
            <div className="text-center">
                <h1 className="text-4xl">Welcome <span className="text-orange">back!</span></h1>
                <p className="my-2">Thank you for coming back. We hope you have a great day<br/>and inspire others.</p>
                <div className="p-6"><LoginForm/></div>
                <p>Don't have an account yet? <Link to={routeConstants.SIGNUP} className="text-alt-orange hover:underline">Sign up</Link></p>
            </div>
        </Layout>
    )
}

export default Login;
