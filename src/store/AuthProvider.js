import { useReducer } from "react";
import AuthContext from "./auth-context";

const initialState = {
    token: localStorage.getItem('userToken'),
    userEmail: localStorage.getItem('userEmail'),
    isLoggedIn: localStorage.getItem('userToken') ? true : false,
    setToken: (token) => {},
    clearToken: () => {}
};

const reducerHandler = (state, action) => {
    switch(action.type) {
        case "ADD_TOKEN":
            return {
                ...state,
                token: action.token,
                userEmail: action.userEmail,
                isLoggedIn: true
            };
        case "REMOVE_TOKEN":
            return {
                ...state,
                token: null,
                userEmail: null,
                isLoggedIn: false
            }
        default:
            return state;
    }
};

const AuthProvider = (props) => {
    const [authState, dispacth] = useReducer(reducerHandler, initialState);

    const storeTokenHandler = (token, email) => {
        dispacth({
            type: 'ADD_TOKEN',
            token,
            userEmail: email
        });
        localStorage.setItem('userToken', token);
        localStorage.setItem('userEmail', email);
    }

    const clearTokenHandler = () => {
        dispacth({
            type: 'REMOVE_TOKEN'
        });
        localStorage.removeItem('userToken');
        localStorage.removeItem('userEmail');
    }

    return (
        <AuthContext.Provider value={{
            token: authState.token,
            userEmail: authState.userEmail,
            isLoggedIn: authState.isLoggedIn,
            setToken: storeTokenHandler,
            clearToken: clearTokenHandler
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;