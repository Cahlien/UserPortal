import {Button, Table} from "react-bootstrap"
import {useContext, useRef, useState} from "react"
import AuthContext from "../../store/auth-context"
import axios from "axios"

const SingleAccount = ({accounts}) => {

    var [account, setAccount] = useState({});
    var [amount, setAmount] = useState({});
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const withAmt = useRef();
    const depAmt = useRef();
    let dispActs = []
    const TransferEntity = { amount: amount };

    if (!Array.prototype.slice.call(accounts).length === 0) {
        console.log('account checks as empty, dispActs: ', dispActs)
        return null
    } else {
        console.log('accounts has more than 0, dispActs: ', dispActs)
        dispActs = [].slice.call(accounts)
        console.log('after dispActs is set: ', dispActs)

        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Nickname</th>
                        <th>Balance</th>
                        <th>Interest</th>
                        <th>Date Created</th>
                        <th>Type</th>
                        <th>Withdraw</th>
                        <th>Deposit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {(dispActs ?? []).map((account, index) => (
                        <tr data-index={index}>
                            <td>{account.nickname}</td>
                            <td>${account.balance}</td>
                            <td>{account.interest}%</td>
                            <td>{account.create_date}</td>
                            <td>{account.type}</td>
                            <td>$<input
                                type="text"
                                id="withdraw"
                                ref={withAmt}/>
                                <Button
                                    variant="success"
                                    type={'submit'}
                                    onClick={submitWithdraw}
                                    id='Review'
                                >Withdraw</Button></td>
                            <td>$<input
                                type="int"
                                id="deposit"
                                ref={depAmt}/>
                                <Button
                                    variant="success"
                                    type={'submit'}
                                    onClick={submitDeposit}
                                    id='Review'
                                >Deposit</Button></td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        )
    }

    function submitWithdraw(event) {
        event.preventDefault();
        console.log('withdraw detected')
        let amount = parseInt(withAmt.current.value, 10)
        if (amount === parseInt(amount, 10)) {
            if (amount > 0) {
                amount *= -1
            }
            setAmount(parseInt(amount))
            changeMoney()
        } else {
            console.log('amount not an integer')
        }

    }

    function submitDeposit(event) {
        event.preventDefault();
        console.log('deposit detected')
        let amount = parseInt(depAmt.current.value, 10)
        console.log(amount)
        if (amount === parseInt(amount, 10)) {
            if (amount < 0) {
                amount *= -1
            }
            setAmount(parseInt(amount))
            changeMoney();
        } else {
            console.log('amount not an integer')
        }

    }

    async function changeMoney(event) {
        const url = 'http://localhost:9001/accounts/' + accounts[0].accountId
        if (!event === null) {
            event.preventDefault();
        }

        const headers = {
            'Authorization': token,
            'Content-Type': 'application/json'
        };

        try {
            const response = await axios.put(url, TransferEntity, headers);
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }
}

export default SingleAccount