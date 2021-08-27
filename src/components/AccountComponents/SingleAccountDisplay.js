import { Button, Table, Modal, Alert } from "react-bootstrap"
import { useContext, useRef, useState } from "react"
import AuthContext from "../../store/auth-context"
import axios from "axios"
import Deactivator from "./AccountDeactivation/AccountDeactivator";
import { render } from "@testing-library/react";
import { useHistory } from "react-router";
import { useEffect } from "react";

const SingleAccount = ({ accounts }) => {

    var [account, setAccount] = useState({});
    var [amount, setAmount] = useState({});
    const [show, setShow] = useState(false);
    const [showWarn, setShowWarn] = useState(false);
    const [warnMessage, setWarnMsg] = useState();
    const history = useHistory();
    useEffect(() => {
        setAccount(accounts)
    }, [accounts])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const withAmt = useRef();
    const depAmt = useRef();
    const TransferEntity = { amount };

    function deactivateHandler(account, history) {
        render(
            <section>
                <Deactivator account={account} history={history} />
            </section>
        )
    }

    if (accounts === null) {
        return null
    } else {
        return (
            <div>
                <Alert variant="warning" show={showWarn} >
                    {warnMessage}
                </Alert>
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
                            <th>Deactivate</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{account ? account.nickname : null}</td>
                            <td>${account ? (account.balance / 100) : null}</td>
                            <td>{account ? account.interest : null}%</td>
                            <td>{account ? account.createDate : null}</td>
                            <td>{account ? account.type : null}</td>
                            <td>$<input
                                type="text"
                                id="withdrawInput"
                                ref={withAmt} />
                                <Button
                                    variant="success"
                                    type={'submit'}
                                    onClick={submitWithdraw}
                                    title='withdrawButton'
                                >Withdraw</Button></td>
                            <td>$<input
                                type="int"
                                id="depositInput"
                                ref={depAmt} />
                                <Button
                                    variant="success"
                                    type={'submit'}
                                    onClick={submitDeposit}
                                    title='depositButton'
                                >Deposit</Button></td>
                            <td><Button
                                onClick={handleShow}
                                variant="danger"
                                type={'submit'}
                                title='deactivate'>
                                Deactivate Account</Button>

                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Are You Sure?</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Once deactivated, you will no longer be able to use this account: {account ? account.nickname : null}</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Cancel
                                        </Button>
                                        <Button variant="primary" onClick={() => deactivateHandler(account, history)}>
                                            Deactivate Account
                                        </Button>
                                    </Modal.Footer>
                                </Modal></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        )
    }

    function submitWithdraw(event) {
        if (!event === null) {
            event.preventDefault();
        }
        let amount = parseFloat(withAmt.current.value, 10) * 100;
        console.log('withdraw value:', parseFloat(withAmt.current.value, 10));
        if (amount === parseFloat(amount, 10)) {
            if (amount > 0) {
                setAmount(amount *= -1);
            }
            changeMoney(amount)
        } else {
            console.log('amount not an integer')
        }

    }

    function submitDeposit(event) {
        if (!event === null) {
            event.preventDefault();
        }
        console.log('dpst value:', depAmt.current.value);
        let amount = parseFloat(depAmt.current.value, 10) * 100;
        if (amount === parseFloat(amount, 10)) {
            if (amount < 0) {
                setAmount(amount *= -1)
            }
            changeMoney(amount);
        } else {
            console.log('amount not an integer')
        }

    }

    async function changeMoney(amount) {
        TransferEntity.amount = amount;
        const url = 'http://localhost:9001/accounts/' + account.accountId
        const headers = {
            'Authorization': token,
            'Content-Type': 'application/json'
        };
        if (account.balance + TransferEntity.amount >= 0) {
            try {
                console.log('amount: ', amount)
                console.log('TE.A: ', TransferEntity.amount)
                const response = await axios.put(url, TransferEntity, headers);
                console.log('put response: ', response.data)
                setAccount(response.data)
                window.location.reload();
            } catch (e) {
                console.log(e)
            }
        }
        else if (account.balance + TransferEntity.amount < 0) {
            setWarnMsg('No overdraft allowance present, cannot withdraw more than your current balance of $' + accounts.balance / 100)
            setShowWarn(true);
        }
    }
}

export default SingleAccount