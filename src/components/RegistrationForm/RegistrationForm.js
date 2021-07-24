import {useRef} from "react";
import {useHistory} from 'react-router-dom';
import axios from "axios"

function RegistrationForm(props) {
    const emailRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const passwordRef = useRef();
    const phoneRef = useRef();
    const roleRef = useRef();
    const usernameRef = useRef();
    const dateOfBirthRef = useRef();
    const url = props.url;
    const history = useHistory();

    function cancelHandler(event) {
        history.replace('/')
    }

    async function submitHandler(event) {
        event.preventDefault();

        const enteredEmail = emailRef.current.value;
        const enteredFirstName = firstNameRef.current.value;
        const enteredLastName = lastNameRef.current.value;
        const enteredPassword = passwordRef.current.value;
        const enteredPhone = phoneRef.current.value;
        const enteredRole = roleRef.current.value;
        const enteredUsername = usernameRef.current.value;
        const enteredDateOfBirth = dateOfBirthRef.current.value;

        const registrationData = {
            email: enteredEmail,
            firstName: enteredFirstName,
            lastName: enteredLastName,
            password: enteredPassword,
            phone: enteredPhone,
            role: enteredRole,
            username: enteredUsername,
            dateOfBirth: enteredDateOfBirth
        }

        try {
            const response = await axios.post(url, registrationData);
            console.log(response.data);
            history.replace('/');
        } catch (e) {

        }
    }

    return (
        <section data-testid={'newRegistrationForm'}>
            <label htmlFor={'email'}>Email</label>
            <input type={'text'} id={'email'} ref={emailRef}/>
            <br/>
            <label htmlFor={'firstName'}>First Name</label>
            <input type={'text'} id={'firstName'} ref={firstNameRef}/>
            <br/>
            <label htmlFor={'lastName'}>Last Name</label>
            <input type={'text'} id={'lastName'} ref={lastNameRef}/>
            <br/>
            <label htmlFor={'password'}>Password</label>
            <input type={'text'} id={'password'} ref={passwordRef}/>
            <br/>
            <label htmlFor={'phone'}>Phone Number</label>
            <input type={'text'} id={'phone'} ref={phoneRef}/>
            <br/>
            <label htmlFor={'role'}>Role</label>
            <input type={'text'} id={'role'} ref={roleRef}/>
            <br/>
            <label htmlFor={'username'}>Username</label>
            <input type={'text'} id={'username'} ref={usernameRef}/>
            <br/>
            <label htmlFor={'dateOfBirth'}>Date of Birth</label>
            <input type={'text'} id={'dateOfBirth'} ref={dateOfBirthRef}/>
            <br/>
            <button type={'cancel'} data-testid={'cancelNewRegistrationButton'} onClick={cancelHandler}>Cancel</button>
            <button type={'submit'} data-testid={'submitNewRegistrationButton'} onClick={submitHandler}>Submit</button>
        </section>
    )
}

export default RegistrationForm;