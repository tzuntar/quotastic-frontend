import {FC} from "react";
import Routes from "./routes/Routes";
import {usePageIdentification} from "./hooks/usePageIdentification";
import {observer} from "mobx-react";

const App: FC = () => {
    usePageIdentification();
    // ToDo: temporarily disable refresh tokens because the backend doesn't support it yet
    //useAuth();

    return <Routes/>;
};

export default observer(App);
