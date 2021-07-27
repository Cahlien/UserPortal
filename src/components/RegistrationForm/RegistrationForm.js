import {useRef} from "react";
import {useHistory} from 'react-router-dom';
import axios from "axios"
import {Button, ButtonGroup, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";

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
        event.preventDefault();
        history.replace('/')
    }

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
            console.log(response.data);
            history.replace('/');
        } catch (e) {

        }
    }

    return (
        <section>
            <div className={'container'} style={{minHeight: 80 + 'vh', minWidth: 100 + '%', display: 'flex', alignItems:'center'}}>
                <Form className={'offset-4 col-3'}>
                    <FormGroup>
                        <FormLabel for={'username'} className={'col-form-label'}>Username</FormLabel>
                        <FormControl type={'text'} id={'username'} ref={usernameRef} required/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel for={'password'}>Password</FormLabel>
                        <FormControl type={'password'} id={'password'} ref={passwordRef} required/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel for={'firstName'}>First Name</FormLabel>
                        <FormControl type={'text'} id={'firstName'} ref={firstNameRef} required/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel for={'lastName'}>Last Name</FormLabel>
                        <FormControl type={'text'} id={'lastName'} ref={lastNameRef} required/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel for={'email'}>Email Address</FormLabel>
                        <FormControl type={'email'} id={'email'} ref={emailRef} email required/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel for={'phone'}>Phone Number</FormLabel>
                        <FormControl type={'text'} id={'phone'} ref={phoneRef} required />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel for={'dateOfBirth'}>Date of Birth</FormLabel>
                        <FormControl type={'text'} id={'dateOfbirth'} ref={dateOfBirthRef} required />
                    </FormGroup>
                    <ButtonGroup>
                        <Button type={'cancel'} className={'btn btn-secondary'} onClick={cancelHandler} style={{marginRight: 5 + 'px'}}>Cancel</Button>
                        <Button type={'submit'} className={'btn btn-primary'} onClick={submitHandler}>Register</Button>
                    </ButtonGroup>
                </Form>
            </div>
        </section>
    )
}

export default RegistrationForm;