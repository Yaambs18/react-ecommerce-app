import { Button } from "react-bootstrap";

import "./Auth.css";
import { useContext, useRef, useState } from "react";
import AuthContext from "../store/auth-context";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const emailRef = useRef();
    const passRef = useRef();

    const [isLoading, setIsLoading] = useState(false);

    const authCtx = useContext(AuthContext);
    
    const navigate = useNavigate();

    const authHandler = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`, {
                method: 'POST',
                body: JSON.stringify({
                    email: emailRef.current.value,
                    password: passRef.current.value
                }),
                headers: { 'Content-Type': 'application/json'}
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error.message || 'Something went wrong !!!');
            }
            authCtx.setToken(data.idToken);
            emailRef.current.value = '';
            passRef.current.value = '';
        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            setIsLoading(false);
        }

    }
    return (
        <form className="auth-form" onSubmit={authHandler}>
            <div className="form-item">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="jon@example.com" ref={emailRef} required />
            </div>
            <div className="form-item">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" ref={passRef} required />
            </div>
            <Button className="button" type="submit">
                {isLoading ? 'Sending....' : 'Submit'}
            </Button>
        </form>
    )
}

export default Auth;