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
            <nav>
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 px-8 shadow-md">
                    <Link to={routeConstants.HOME}>
                        <img src={logo} alt="Quotastic" className="w-40"/>
                    </Link>
                    <Link to={routeConstants.LOGIN} className="text-orange hover:text-alt-orange">
                        <p className="inline-block align-middle pr-2">
                            Sign In
                        </p>
                        <div className="inline-block align-middle">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                        </div>
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
