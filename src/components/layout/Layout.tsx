import {FC, ReactNode} from "react";

interface Props {
    children: ReactNode | ReactNode[]
}

const Layout: FC<Props> = ({children}) => {
    return (
        <main>
            {/*{userStorage.getUser() !== null ? <Navbar/> : <NavbarNoLogin/>}*/}
            <div>{children}</div>
            {/*<Footer/>*/}
        </main>
    )
}

export default Layout;