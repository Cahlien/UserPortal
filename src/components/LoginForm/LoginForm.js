import axios from "axios";
import { useRef } from "react";
import { useHistory } from 'react-router-dom';

const url = 'http://localhost:9001/users/login';

function LoginForm(props) {
    const history = useHistory();
    const login = useRef();
    const password = useRef();

    async function submitHandler(event) {
        event.preventDefault();

        const enteredUsername = login.current.value;
        const enteredPassword = password.current.value;

        const loginData = {
            email: enteredUsername,
            password: enteredPassword
        }

        try{
            const response = await axios.post(
                url,
                loginData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log(response.data.headers);

            if(response.statusText === "OK"){
                console.log("Login successful");
                console.log(response.headers);
                for(let i = 0; i < response.headers.length; i++){
                    console.log(response.headers[i]);
                }
            } else {
                throw new Error();
            }
        } catch(e) {
            console.log(e);
        }

        history.replace('/');
    }

    return (
        <section>
            <label htmlFor={'email'}>Email</label>
            <input type={'text'} id={'email'} ref={login} />
            <br />
            <label htmlFor={'password'}>Password</label>
            <input type={'text'} id={'password'} ref={password} />
            <br />
            <button type={'submit'} onClick={submitHandler}>Submit</button>
        </section>
    )
}

export default LoginForm