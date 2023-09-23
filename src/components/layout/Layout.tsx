import React, {ReactNode} from "react";
import NavbarNoLogin from "./NavbarNoLogin";
import Footer from "./Footer";
import {userStorage} from "../../lib/localStorage";
import Navbar from "./Navbar";

interface Props {
    children: ReactNode | ReactNode[],
    isVerticallyCentered?: boolean
}

const Layout: React.FC<Props> = ({children, isVerticallyCentered = false}) => {
    return (
        <main className="flex flex-col h-screen justify-between">
            {userStorage.getUser() !== null ? <Navbar/> : <NavbarNoLogin/>}
            <div className={isVerticallyCentered ? 'm-auto' : 'mb-auto'}>{children}</div>
            <Footer/>
        </main>
    )
}

export default Layout;