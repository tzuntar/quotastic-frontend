import React, {ReactNode} from "react";
import NavbarNoLogin from "./NavbarNoLogin";
import Footer from "./Footer";

interface Props {
    children: ReactNode | ReactNode[],
    isVerticallyCentered?: boolean
}

const Layout: React.FC<Props> = ({children, isVerticallyCentered = false}) => {
    return (
        <main className="flex flex-col h-screen justify-between">
            <NavbarNoLogin/>
            {/*{userStorage.getUser() !== null ? <Navbar/> : <NavbarNoLogin/>}*/}
            <div className={isVerticallyCentered ? 'm-auto' : 'mb-auto'}>{children}</div>
            <Footer/>
        </main>
    )
}

export default Layout;