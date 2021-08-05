import AuthContext from "../../store/auth-context";
import SingleAccount from "../layout/SingleAccount";
import { useParams } from "react-router";
import { useEffect, useContext, useState } from "react";
import axios from "axios";

const AccountSingle = () => {

    const { id } = useParams();

    const authContext = useContext(AuthContext);

    var [actAry, setAccount] = useState([])
    const token = authContext.token;

    const url = "http://localhost:9001/accounts/"  + id

    useEffect(() =>
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
                    actAry.push(res.data);
                    console.log('actAry: ', actAry)
                    setAccount([...actAry])
                } else {
                    console.log('response: ', res)
                }
            }, [])
            .then((jsonData) => {
                console.log(jsonData)
            })
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
                    <h3 style={{ display: "flex" }}>Your Accounts:</h3> 
                    <SingleAccount accounts={actAry}/>
                </ul>
            </section>
        )
    }
export default AccountSingle