import { useContext } from "react";
import AuthContext from "../store/auth-context";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = (props) => {
    const authCtx = useContext(AuthContext);

    if(!authCtx.isLoggedIn) {
        return <Navigate to="/auth" replace />;
    }

    return (<Outlet />);
}

export default ProtectedRoute;