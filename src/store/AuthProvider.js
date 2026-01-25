import { useReducer } from "react";
import AuthContext from "./auth-context";

const initialState = {
    token: localStorage.getItem('userToken'),
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
                isLoggedIn: true
            };
        case "REMOVE_TOKEN":
            return {
                ...state,
                token: null,
                isLoggedIn: false
            }
        default:
            return state;
    }
};

const AuthProvider = (props) => {
    const [authState, dispacth] = useReducer(reducerHandler, initialState);

    const storeTokenHandler = (token) => {
        dispacth({
            type: 'ADD_TOKEN',
            token
        });
        localStorage.setItem('userToken', token);
    }

    const clearTokenHandler = () => {
        dispacth({
            type: 'REMOVE_TOKEN'
        });
        localStorage.removeItem('userToken');
    }

    return (
        <AuthContext.Provider value={{
            token: authState.token,
            isLoggedIn: authState.isLoggedIn,
            setToken: storeTokenHandler,
            clearToken: clearTokenHandler
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;