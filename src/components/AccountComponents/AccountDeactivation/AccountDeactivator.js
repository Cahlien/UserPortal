import axios from "axios";


function Deactivator({ account }, { history }) {
    if (account.balance > 0) {
        recovery(account)
        return true;
    }

    else {
        deactivate(account);
        return false
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