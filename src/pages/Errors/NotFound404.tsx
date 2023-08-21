import {FC} from "react";
import {Link} from "react-router-dom";

const NotFound404: FC = () => {
    return (
        <div>
            <h1>Ain't nuthin here (404)</h1>
            <Link to="/">Go to the home page</Link>
        </div>
    )
}

export default NotFound404;
