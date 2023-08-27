import React, {ReactNode} from "react";
import NavbarNoLogin from "./NavbarNoLogin";
import Footer from "./Footer";

interface Props {
    children: ReactNode | ReactNode[]
}

const Layout: React.FC<Props> = ({children}) => {
    return (
        <main className="flex flex-col h-screen justify-between">
            <NavbarNoLogin/>
            {/*{userStorage.getUser() !== null ? <Navbar/> : <NavbarNoLogin/>}*/}
            <div className="mb-auto">{children}</div>
            <Footer/>
        </main>
    )
}

export default Layout;