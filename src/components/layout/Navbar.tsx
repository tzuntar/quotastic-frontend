import React, {useState} from "react";
import {Link} from "react-router-dom";
import {routeConstants} from "../../constants/routeConstants";
import logo from "../../assets/quotastic_logo.png";
import default_avatar from "../../assets/default_avatar.png";
import useMobileDetect from "../../hooks/useMobileDetect";
import authStore from "../../stores/auth.store";

const Navbar: React.FC = () => {
    const {isMobile} = useMobileDetect(990);
    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <header>
            {isMobile ?
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
                    <Link to={routeConstants.POST_QUOTE} className="text-orange">
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
                    </Link>
                </nav>
                :
                <nav className="flex items-center justify-between p-4 px-8">
                    <Link to={routeConstants.HOME}>
                        <img src={logo} alt="Quotastic" className="w-40"/>
                    </Link>
                    <div id="menu" className="flex flex-row space-x-6">
                        <Link to={routeConstants.HOME}>
                            <p className="text-orange hover:text-alt-orange text-lg">Home</p>
                        </Link>
                        <Link to={routeConstants.USER_PREFERENCES}>
                            <p className="text-orange hover:text-alt-orange text-lg">Preferences</p>
                        </Link>
                        <Link to={routeConstants.LOGOUT}>
                            <p className="text-orange hover:text-alt-orange text-lg">Sign Out</p>
                        </Link>
                        <Link to={routeConstants.USER_PROFILE}>
                            <img src={authStore?.user?.avatarUrl ? authStore.user.avatarUrl : default_avatar}
                                 alt="Profile" className="w-8 drop-shadow-sm"/>
                        </Link>
                        <Link to={routeConstants.POST_QUOTE} className="text-orange">
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
                        </Link>
                    </div>
                </nav>
            }
        </header>
    );
}

export default Navbar;
