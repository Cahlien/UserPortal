import {useRef, useState} from "react";
import {useHistory} from 'react-router-dom';
import axios from "axios"
import {Button, ButtonGroup, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import './RegistrationForm.css';

/**
 * The Registration Form component.
 * @author Matthew Crowell <Matthew.Crowell@Smoothstack.com>
 *
 * @param props the properties passed into the form
 * @returns {JSX.Element} the form to be rendered
 * @constructor
 */
function RegistrationForm(props) {
    const [errorMessage, setErrorMessage] = useState();

    const emailRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const passwordRef = useRef();
    const phoneRef = useRef();
    const usernameRef = useRef();
    const dateOfBirthRef = useRef();
    const url = props.url;
    const history = useHistory();

    /**
     * This method cancels the registration and returns the guest to the home page.
     *
     * @param event the click event
     */
    function cancelHandler(event) {
        event.preventDefault();
        history.replace('/')
    }

    /**
     * This method submits the user registration data to the server to be registered and returns the user id.
     *
     * @param event the click event for the register button
     * @returns {Promise<void>} the response from the server containing the user id
     */
    async function submitHandler(event) {
        event.preventDefault();

        const enteredEmail = emailRef.current.value;
        const enteredFirstName = firstNameRef.current.value;
        const enteredLastName = lastNameRef.current.value;
        const enteredPassword = passwordRef.current.value;
        const enteredPhone = phoneRef.current.value;
        const enteredUsername = usernameRef.current.value;
        const enteredDateOfBirth = dateOfBirthRef.current.value;

        const registrationData = {
            email: enteredEmail,
            firstName: enteredFirstName,
            lastName: enteredLastName,
            password: enteredPassword,
            phone: enteredPhone,
            role: 'user',
            username: enteredUsername,
            dateOfBirth: enteredDateOfBirth
        }

        try {
            const response = await axios.post(url, registrationData);
            localStorage.setItem('userId', response.data);
            history.replace('/');
        } catch (e) {
            setErrorMessage(e.message);
        }
    }

    return (
        <section>
            <div className={'container vertical-center'}>
                <Form className={'offset-4 col-3'}>
                    { errorMessage && <div className={'alert-danger mb-3'}>{errorMessage}</div> }
                    <FormGroup>
                        <FormLabel htmlFor={'username'} className={'col-form-label'}>Username</FormLabel>
                        <FormControl type={'text'} id={'username'} ref={usernameRef} required/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor={'password'}>Password</FormLabel>
                        <FormControl type={'password'} id={'password'} ref={passwordRef} required/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor={'firstName'}>First Name</FormLabel>
                        <FormControl type={'text'} id={'firstName'} ref={firstNameRef} required/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor={'lastName'}>Last Name</FormLabel>
                        <FormControl type={'text'} id={'lastName'} ref={lastNameRef} required/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor={'email'}>Email Address</FormLabel>
                        <FormControl type={'email'} id={'email'} ref={emailRef} email required/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor={'phone'}>Phone Number</FormLabel>
                        <FormControl type={'text'} id={'phone'} ref={phoneRef} required />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor={'dateOfBirth'}>Date of Birth</FormLabel>
                        <FormControl type={'text'} id={'dateOfbirth'} ref={dateOfBirthRef} required />
                    </FormGroup>
                    <ButtonGroup>
                        <Button type={'cancel'} className={'btn btn-secondary mt-3'} onClick={cancelHandler} style={{marginRight: 5 + 'px'}}>Cancel</Button>
                        <Button type={'submit'} className={'btn btn-primary mt-3'} onClick={submitHandler}>Register</Button>
                    </ButtonGroup>
                </Form>
            </div>
        </section>
    )
}

export default RegistrationForm;