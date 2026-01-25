import { useContext } from "react";
import AuthContext from "../store/auth-context";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = (props) => {
    const authCtx = useContext(AuthContext);

    if(authCtx.isLoggedIn) {
        return <Navigate to="/products" replace />;
    }

    return (<Outlet />);
}

export default PublicRoute;