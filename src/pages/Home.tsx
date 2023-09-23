import Layout from "../components/layout/Layout";
import React from "react";
import {userStorage} from "../lib/localStorage";
import LandingHome from "../components/homepage/LandingHome";

const Home: React.FC = () => {
    return (
        <Layout>
            {userStorage.getUser() !== null ? <LandingHome/> : <LandingHome/>}
        </Layout>
    );
}

export default Home;
