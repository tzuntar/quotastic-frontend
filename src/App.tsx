import React, {FC} from "react";
import Routes from "./routes/Routes";
import {ModalProvider} from "./features/ModalContext";
import {usePageIdentification} from "./hooks/usePageIdentification";
import {observer} from "mobx-react";

const App: FC = () => {
    usePageIdentification();
    // ToDo: temporarily disable refresh tokens because the backend doesn't support it yet
    //useAuth();

    return <ModalProvider><Routes/></ModalProvider>;
};

export default observer(App);
