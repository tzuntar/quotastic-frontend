import Layout from "../components/layout/Layout";
import React from "react";
import {Link} from "react-router-dom";
import {routeConstants} from "../constants/routeConstants";
import RegistrationForm from "../components/user/RegistrationForm";

const Registration: React.FC = () => {
    return (
        <Layout isVerticallyCentered={true}>
            <div className="grid grid-cols-1 lg:grid-cols-3 items-center text-center">
                <div className="lg:col-start-2">
                    <h1 className="text-4xl">What's your <span className="text-orange">name?</span></h1>
                    <p className="my-2 mx-6 lg:max-w-sm">Tell us a bit about yourself. Your name will appear on your
                        posted quotes
                        and profile.</p>
                    <div className="p-6"><RegistrationForm/></div>
                    <p>Coming back? <Link to={routeConstants.LOGIN}
                                          className="text-alt-orange hover:underline">Sign in instead</Link></p>
                </div>
            </div>
        </Layout>
    );
}

export default Registration;
