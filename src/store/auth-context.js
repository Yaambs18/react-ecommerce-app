import { createContext } from "react";

const AuthContext = createContext({
    token: null,
    userEmail: null,
    isLoggedIn: false,
    setToken: (token) => {},
    clearToken: () => {}
});

export default AuthContext;