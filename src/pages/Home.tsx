import Layout from "../components/layout/Layout";
import React from "react";
import {userStorage} from "../lib/localStorage";
import LandingHome from "../components/homepage/LandingHome";
import Dashboard from "../components/homepage/Dashboard";

const Home: React.FC = () => {
    return (
        <Layout>
            {userStorage.getUser() !== null ? <Dashboard/> : <LandingHome/>}
        </Layout>
    );
}

export default Home;
