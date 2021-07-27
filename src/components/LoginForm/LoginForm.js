import axios from "axios";
import {useContext, useRef, useState} from "react";
import {useHistory} from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import Form from 'react-bootstrap/Form';

const url = 'http://localhost:9001/users/login';

function LoginForm(props) {
    const history = useHistory();

    const authContext = useContext(AuthContext)

    const [attemptedLogIn, setAttemptedLogIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const email = useRef();
    const password = useRef();

    async function submitHandler(event) {
        if (errorMessage) {
            setAttemptedLogIn(false);
            setErrorMessage('');
        }
        event.preventDefault();
        setAttemptedLogIn(true);

        const enteredEmail = email.current.value;
        const enteredPassword = password.current.value;

        const loginData = {
            email: enteredEmail,
            password: enteredPassword
        }

        setIsLoading(true);

        try {
            const response = await axios.post(
                url,
                loginData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            setIsLoading(false);

            if (response.status === 200) {
                const token = response.headers['authorization'];
                const userId = response.headers['btuid'];
                authContext.login(token, userId);
                history.replace('/');
            } else if (response.status === 403) {
                console.log(response)
            }
        } catch (e) {
            setIsLoading(false);
            setErrorMessage(e.message);

            if (e.message === "Request failed with status code 403") {
                setErrorMessage("Authentication failed");
            } else if (e.message === "Request failed with status code 503") {
                setErrorMessage("Authentication server error.  Please try again.");
            } else {
                setErrorMessage("Something went wrong... Please try again later.");
            }
        }
    }

    return (
<section id="login" class="col-12 h-75 w-100">
    <div class="container offset-4 col-4" style={{minHeight: 80 + 'vh', display: 'flex', alignItems:'center'}}>
        <Form>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp" ref={email} />
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group mt-2">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" ref={password} />
            </div>
            <button type="submit" class="btn btn-primary mt-2" onClick={submitHandler}>Log In</button>
        </Form>
    </div>
</section>
    );
}

export default LoginForm