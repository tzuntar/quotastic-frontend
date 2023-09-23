import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {routeConstants} from "../../constants/routeConstants";
import useMobileDetect from "../../hooks/useMobileDetect";
import logo from "../../assets/quotastic_logo.png";

const Navbar: React.FC = () => {
    const {isMobile} = useMobileDetect(990);
    const [navbarToggle, setNavbarToggle] = useState(false);
    useNavigate();

    return (
        <header>
            <nav className="border-b-2 shadow-navbar">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 px-8">
                    <Link to={routeConstants.HOME}>
                        <img src={logo} alt="Quotastic" className="w-28 md:w-40"/>
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
