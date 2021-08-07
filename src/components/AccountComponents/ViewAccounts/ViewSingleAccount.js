import AuthContext from "../../../store/auth-context";
import SingleAccount from "../SingleAccount";
import { useParams } from "react-router";
import { useEffect, useContext, useState } from "react";
import axios from "axios";

const AccountSingle = () => {

    const { id } = useParams();

    const authContext = useContext(AuthContext);

    var [account, setAccount] = useState({});
    const token = authContext.token;

    const url = `http://localhost:9001/accounts/${id}`
    const headers = {
        'Authorization': token,
        'Content-Type': 'application/json'
    }
    useEffect(() =>
            axios.get(
            url,
            {
                headers
            })
            .then((res) => {
                if (res.statusText === "OK") {
                    console.log('SINGLE VIEW SUCCESSFUL');
                    console.log('result: ', res.data);
                    setAccount(res.data);
                } else {
                    console.log('SINGLE VIEW FAILED');
                    console.log('result: ', res)
                }
            }, [])
            .catch((e) => {
                if (e.response === 403) {
                    console.log('VIEW FAILURE: Code 403 (Forbidden). Your login may be expired or your URL may be incorrect.')
                }
                console.log('Error message: ', e.message + ', code: ' + e.response);
            }), []
        )  

    return (
        <section>
            <ul>
                <h3 style={{ display: "flex" }}>Your Account:</h3>
                <SingleAccount accounts={account} />
            </ul>
        </section>
    )
}
export default AccountSingle