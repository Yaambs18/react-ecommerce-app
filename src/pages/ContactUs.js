import { useRef, useState } from "react";
import "./ContactUs.css";

const ContactUs = () => {

    const [isLoading, setIsLoading] = useState(false);

    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const messageRef = useRef();

    async function submitHandler(event) {
        try {

            setIsLoading(true);
            event.preventDefault();

            const enteredPhone = phoneRef.current.value;
    
            // validate phone number
            const phoneRegex = /^[6-9]+\d{9}$/;
            if (!phoneRegex.test(enteredPhone)) {
                phoneRef.current.focus();
                alert('Please enter a valid 10-digit phone number');
                return;
            }
            const contactFormObj = {
                name: nameRef.current.value,
                email: emailRef.current.value,
                phoneNumber: phoneRef.current.value,
                message: messageRef.current.value
            };

            const response = await fetch(process.env.REACT_APP_FIREBASE_DATABASE_URL + 'contact-us.json',{
                method: 'POST',
                body: JSON.stringify(contactFormObj),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if(!response.ok) throw new Error('Failed to send message!!!');
            await response.json();

            nameRef.current.value = '';
            emailRef.current.value = '';
            phoneRef.current.value = '';
            messageRef.current.value = '';

            alert('Message sent successfully');
        } catch (error) {
            alert(error.message);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <form className="contact-form" onSubmit={submitHandler}>
            <div className="form-item">
                <label htmlFor="name">Name</label>
                <input id="name" type="text" ref={nameRef}/>
            </div>
            <div className="form-item">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" ref={emailRef}/>
            </div>
            <div className="form-item">
                <label htmlFor="phone">Phone Number</label>
                <input id="phone" type="text" minLength={10} maxLength={10} ref={phoneRef}/>
            </div>
            <div className="form-item">
                <label htmlFor="message">Message</label>
                <input id="message" type="text" ref={messageRef}/>
            </div>
            <button className="button" disabled={isLoading}>
                {isLoading ? 'Sending....' : 'Submit'}
            </button>
        </form>
    )
}

export default ContactUs;