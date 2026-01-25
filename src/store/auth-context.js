import { createContext } from "react";

const AuthContext = createContext({
    token: null,
    isLoggedIn: false,
    setToken: (token) => {},
    clearToken: () => {}
});

export default AuthContext;