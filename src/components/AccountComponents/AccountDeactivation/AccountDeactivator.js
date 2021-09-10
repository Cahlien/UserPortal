import axios from "axios";


function Deactivator({ account }, { history }, { userId }, { token }) {
    if (account.balance > 0) {
        recovery(account)
        return true;
    } else {
        deactivate(account);
        return false
    }

    function deactivate(account) {
        const url = "http://localhost:9001/accounts?userId=" + userId
        console.log('attempting to deactivate: ', account.id);
        console.log('url out:', url);
        axios.delete(url, {
            headers: {
                'Authorization': token,
                "Content-Type": "application/json"
            },
            data: account.id

        }).then((res) => {
            console.log('deactivate result: ', res)
            history.push("/accounts/me")
        }).catch((e) => {
            console.log('deactivate error: ', e)
        });

    }

    function recovery(account) {
        const url = "http://localhost:9001/accounts/recovery/" + account.accountId
        console.log('attempting to recover: ', account)
        axios.put(url, {
            params: {userId: userId},
            headers: {
                'Authorization': token,
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