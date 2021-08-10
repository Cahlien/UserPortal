import axios from "axios";
import { Alert } from "react-bootstrap";
import { useState } from "react";


function Deactivator({ account, history }) {
    const [show, setShow] = useState(true);
    console.log('in deactivator, recvd: ', account);
    if (account.balance > 0) {
        console.log('recovery needed')
        if (show) {
            window.setTimeout(() => {
                setShow(false)
            }, 10000)
            recovery(account)
            return (
                <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>Warning! This account still has a Balance!</Alert.Heading>
                    <p>
                        You cannot close an account with a balance. It will be placed in Recovery until
                        the balance reaches zero. Recovery accounts will always have a 0% interest,
                        meaning no dividends will be accrued from them. Beardtrust reccomends transferring
                        money to another account or withdrawing everything.
                    </p>
                </Alert>
            );
        }
        return null;
    }
    else {
    deactivate(account);
    return null
    }


    function deactivate(account) {
        const url = "http://localhost:9001/accounts"
        console.log('attempting to deactivate: ', account)
        axios.delete(url, {
            headers: {
                "Content-Type": "application/json"
            },
            data: account.accountId

        }).then((res) => {
            console.log(res)
            history.push("/accounts/me")
        }).catch((e) => {
            console.log(e)
        });

    }

    function recovery(account) {
        const url = "http://localhost:9001/accounts/recovery/" + account.accountId
        console.log('attempting to recover: ', account)
        axios.put(url, {
            headers: {
                "Content-Type": "application/json"
            },
            data: account.accountId

        }).then((res) => {
            console.log(res)
            history.push("/accounts/me")
        }).catch((e) => {
            console.log(e)
        });
    }
}
export default Deactivator