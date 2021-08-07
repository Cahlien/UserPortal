import axios from "axios";

const Deactivator = ({ account, history }) => {
    console.log('in deactivator, recvd: ', account)
    deactivate(account);
    return null

    function deactivate(account) {
        console.log('attempting to deactivate: ', account)
        const url = "http://localhost:9001/accounts"
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
}
export default Deactivator