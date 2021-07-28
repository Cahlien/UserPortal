import axios from "axios"
import User from "../layout/User"
import { useState } from "react"
import AuthContext from "../../store/auth-context"
import { useContext } from "react"
import UpdateUserForm from "../UpdateUserForm/UpdateUserForm"
import { Button } from "react-bootstrap"

function ViewUserForm() {

    const authContext = useContext(AuthContext);

    var [user, setUser] = useState({})
    const token = authContext.token;
    const userId = authContext.userId;

    const url = 'http://localhost:9001/users/' + userId

    function submitView(event) {
        if (!event === null) {
            event.preventDefault();
        }

        axios.get(
            url,
            {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                if (res.statusText === "OK") {
                    console.log('VIEW SUCCESSFUL');
                    setUser(res.data)
                } else {
                    throw new Error('VIEW UNSUCCESSFUL');
                }
            }, [])
            .then((jsonData) => {
                console.log(jsonData)
            })
            .catch((e) => {
                if (e.response === 403) {
                    console.log('VIEW FAILURE: Code 403 (Forbidden). Your login may be expired or your URL may be incorrect.')
                }
                console.log('Error message: ', e.message);
            });
    }
    return viewScreen();
    function viewScreen() {
        return (
            <section>
                <ul>
                    <h3 style={{ display: "flex" }}>Your Details:                
                    <Button style={{ marginLeft: "auto" }} type={'submit'} onClick={submitView} id='Refresh?'>Need to Refresh?</Button>
                    </h3>
                    <User user={user} />
                    <UpdateUserForm user={user} />
                </ul>
            </section>
        )
    }
}
export default ViewUserForm