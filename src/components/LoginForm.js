import axios from "axios"
import { useRef } from "react";

const url = 'http://localhost:9001/users/login'
function LoginForm(props) {

    const login = useRef();
    const password = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const enteredUsername = login.current.value;
        const enteredPassword = password.current.value;

        const loginData = {
            email: enteredUsername,
            password: enteredPassword
        }

        console.log(loginData);
        var token = Buffer.from('${enteredUsername}:${enteredPassword}', 'utf8').toString('base64')

        axios(
            url,
            {
                method: 'POST',
                data: JSON.stringify(loginData),
                headers: {
                    'Authorization': '${token}',
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                if (res.statusText === "OK") {
                    console.log('LOGIN SUCCESSFUL');
                    console.log('Token: ' + token)
                    return res;
                } else {
                    throw new Error();
                }
            })
            .then((jsonData) => {
                console.log(jsonData)
            })
            .catch((e) => {
                if (e.response.status === 403) {
                    console.log('LOGIN FAILURE: Code 403 (Forbidden). This is likely improper login info.')   
                }
                console.log('Error message: ', e.message);
            });;
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