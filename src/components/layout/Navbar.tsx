import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {routeConstants} from "../../constants/routeConstants";
import logo from "../../assets/quotastic_logo.png";

const Navbar: React.FC = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const navigate = useNavigate();

    return (
        <header>
            <nav className="shadow-navbar flex items-center justify-between px-8 py-3">
                <div className="block lg:hidden">
                    <button className="text-orange">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 px-8">
                    <Link to={routeConstants.HOME}>
                        <img src={logo} alt="Quotastic" className="w-28 md:w-40"/>
                    </Link>
                </div>
                <div>
                    <button className="text-orange">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                    </button>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
