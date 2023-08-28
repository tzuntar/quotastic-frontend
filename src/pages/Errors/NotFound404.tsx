import React from "react";
import {Link} from "react-router-dom";
import Layout from "../../components/layout/Layout";
import {routeConstants} from "../../constants/routeConstants";

const NotFound404: React.FC = () => {
    return (
        <Layout>
            <h1>Ain't nothing here (404)</h1>
            <Link to={routeConstants.HOME} className="text-alt-orange hover:underline">Go to the home page</Link>
        </Layout>
    )
}

export default NotFound404;
