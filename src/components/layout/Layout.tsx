import React, {ReactNode} from "react";
import NavbarNoLogin from "./NavbarNoLogin";
import Footer from "./Footer";
import {userStorage} from "../../lib/localStorage";
import Navbar from "./Navbar";
import Modals from "./Modals";
import {useModal} from "../../features/ModalContext";

interface Props {
    children: ReactNode | ReactNode[],
    isVerticallyCentered?: boolean
}

const Layout: React.FC<Props> = ({children, isVerticallyCentered = false}) => {
    const {setShownModal} = useModal();

    const handleMenuOptionSelect = (action: string) =>
        setShownModal(action);

    return (
        <main className="flex flex-col h-screen justify-between">
            {userStorage.getUser() !== null
                ? <Navbar menuActionHandler={handleMenuOptionSelect}/>
                : <NavbarNoLogin/>}
            <div className={isVerticallyCentered ? 'm-auto' : 'mb-auto'}>
                {userStorage.getUser() !== null && <Modals/>}
                {children}
            </div>
            <Footer/>
        </main>
    )
}

export default Layout;