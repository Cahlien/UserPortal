import axios from "axios"
import { useRef } from "react"
import AuthContext from "../../../store/auth-context"
import { useContext, useState } from "react"
import { Form, FormGroup, FormLabel, FormControl, ButtonGroup, Button } from "react-bootstrap"


function UpdateUserForm({ user }) {
    const authContext = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState();

    const emailRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const passwordRef = useRef();
    const phoneRef = useRef();
    const usernameRef = useRef();
    const dateOfBirthRef = useRef();
    const token = authContext.token;
    const userId = authContext.userId;


    const url = 'http://localhost:9001/users/' + userId

    function submitUpdate(event) {
        if (!event === null) {
            event.preventDefault();
        }

        let enteredEmail
        let enteredUsername
        let enteredPassword
        let enteredFirstName
        let enteredLastName
        let enteredPhone
        let enteredDateOfBirth
        if (emailRef.current.value !== null) {enteredEmail = emailRef.current.value}
        if (firstNameRef.current.value !== null) {enteredFirstName = firstNameRef.current.value;}
        if (lastNameRef.current.value  !== null) {enteredLastName = lastNameRef.current.value;}
        if (passwordRef.current.value  !== null) {enteredPassword = passwordRef.current.value;}
        if (phoneRef.current.value  !== null) {enteredPhone = phoneRef.current.value;}
        if (usernameRef.current.value  !== null) {enteredUsername = usernameRef.current.value;}
        if (dateOfBirthRef.current.value  !== null) {enteredDateOfBirth = dateOfBirthRef.current.value;}


        if (emailRef.current.value === '') {
            enteredEmail = user.email
        } if (firstNameRef.current.value === '') {
            enteredFirstName = user.firstName;
        } if (lastNameRef.current.value === '') {
            enteredLastName = user.lastName;
        } if (passwordRef.current.value === '') {
            enteredPassword = user.password;
        } if (phoneRef.current.value === '') {
            enteredPhone = user.phone
        } if (usernameRef.current.value === '') {
            enteredUsername = user.username
        } if (dateOfBirthRef.current.value === '') {
            enteredDateOfBirth = user.dateOfBirth
        }
        const registrationData = {
            email: enteredEmail,
            firstName: enteredFirstName,
            lastName: enteredLastName,
            password: enteredPassword,
            phone: enteredPhone,
            username: enteredUsername,
            dateOfBirth: enteredDateOfBirth
        }
    

        axios(
            url,
            {
                method: 'PUT',
                data: JSON.stringify(registrationData),
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                return response.data;
            }).then((data) => {
                console.log('UPDATE SUCCESSFUL');
                console.log(data);
            }).catch((e) => {
                setErrorMessage(e);
                console.log('UPDATE ERROR')
                console.log(token)
                if (e.response.status === 409) {
                    console.log('Error 409 (Bad Request) detected. This is likely a duplicate user.')//need an error page responding with duplicae warning
                }
                if (e.response.status === 503) {
                    console.log('Error 503 (Service Unavailablet) detected. The server is likely down.')//need an error page responding with duplicae warning
                } 
                else {
                    console.log('Unexpected error: ', errorMessage + ' please contact an admin.')
                }
            });

    }


    return (
        <section>
            <div className={'container vertical-center'}>
                <Form className={'offset-4 col-3'}>
                <h3>Want to update anything?</h3>
                    <FormGroup>
                        <FormLabel htmlFor={'username'} className={'col-form-label'}>Update Username</FormLabel>
                        <FormControl type={'text'} id={'username'} ref={usernameRef} />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor={'password'}>Update Password</FormLabel>
                        <FormControl type={'password'} id={'password'} ref={passwordRef} />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor={'firstName'}>Update First Name</FormLabel>
                        <FormControl type={'text'} id={'firstName'} ref={firstNameRef} />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor={'lastName'}>Update Last Name</FormLabel>
                        <FormControl type={'text'} id={'lastName'} ref={lastNameRef} />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor={'email'}>Update Email Address</FormLabel>
                        <FormControl type={'email'} id={'email'} ref={emailRef} email={'true'} />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor={'phone'}>Update Phone Number</FormLabel>
                        <FormControl type={'text'} id={'phone'} ref={phoneRef}  />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor={'dateOfBirth'}>Update Date of Birth</FormLabel>
                        <FormControl type={'text'} id={'dateOfbirth'} ref={dateOfBirthRef}  />
                    </FormGroup>
                    <ButtonGroup>
                        <Button type={'submit'} className={'btn btn-primary mt-3'} onClick={submitUpdate}>Submit Update</Button>
                    </ButtonGroup>
                </Form>
            </div>
        </section>
    )
}
export default UpdateUserForm