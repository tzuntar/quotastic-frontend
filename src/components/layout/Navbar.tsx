import React, {useState} from "react";
import {Link} from "react-router-dom";
import {routeConstants} from "../../constants/routeConstants";
import logo from "../../assets/quotastic_logo.png";
import default_avatar from "../../assets/default_avatar.png";
import useMobileDetect from "../../hooks/useMobileDetect";
import authStore from "../../stores/auth.store";
import {ModalActions} from "../../constants/modalActionConstants";

interface Props {
    menuActionHandler: (action: string) => void
}

const Navbar: React.FC<Props> = ({menuActionHandler}) => {
    const {isMobile} = useMobileDetect(990);
    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <header>
            {isMobile ?
                <nav className="shadow-navbar flex items-center justify-between px-8 py-3">
                    {!menuVisible ?
                        <>
                            <div className="block lg:hidden">
                                <button className="text-orange"
                                        onClick={() => setMenuVisible(!menuVisible)}>
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
                            <div
                                className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 px-8">
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
                        </>
                        :
                        <>
                            <div className="flex-none w-full">
                                <div className="block pt-4">
                                    <button className="text-orange"
                                            onClick={() => setMenuVisible(!menuVisible)}>
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
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>

                                    </button>
                                </div>
                                <div className="block pt-4">
                                    <Link to={routeConstants.USER_PROFILE}>
                                        <div className="flex flex-row space-x-4 align-middle items-center">
                                            <img src={authStore?.user?.avatarUrl ? authStore.user.avatarUrl : default_avatar}
                                                 alt="Profile" className="w-8 h-8 drop-shadow-sm"/>
                                            <p>{authStore?.user?.firstName} {authStore?.user?.lastName}</p>
                                        </div>
                                    </Link>
                                </div>
                                <div className="block pt-6 flex flex-row justify-between">
                                    <Link to={routeConstants.HOME}>
                                        Home
                                    </Link>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 6l8 8-8 8"
                                        />
                                    </svg>
                                </div>
                                <div className="block pt-6 flex flex-row justify-between">
                                    <Link to={routeConstants.USER_PREFERENCES}>
                                        Preferences
                                    </Link>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 6l8 8-8 8"
                                        />
                                    </svg>
                                </div>
                                <div className="block py-6 flex flex-row justify-between">
                                    <Link to={routeConstants.LOGOUT}>
                                        <p className="text-orange">Sign Out</p>
                                    </Link>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-orange"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 6l8 8-8 8"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </>

                    }
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
                        <button onClick={() => menuActionHandler(ModalActions.USER_PREFERENCES)}
                                className="h-0">
                            <p className="text-orange hover:text-alt-orange text-lg">Preferences</p>
                        </button>
                        <Link to={routeConstants.LOGOUT}>
                            <p className="text-orange hover:text-alt-orange text-lg">Sign Out</p>
                        </Link>
                        <Link to={routeConstants.USER_PROFILE}>
                            <img src={authStore?.user?.avatarUrl ? authStore.user.avatarUrl : default_avatar}
                                 alt="Profile" className="w-8 drop-shadow-sm"/>
                        </Link>
                        <button onClick={() => menuActionHandler(ModalActions.CREATE_QUOTE)}
                                className="text-orange h-0">
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
            }
        </header>
    );
}

export default Navbar;
