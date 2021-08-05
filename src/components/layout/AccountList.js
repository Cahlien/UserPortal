import { Table, Button } from "react-bootstrap"
import AccountSingle from "../ViewAccounts/ViewSingleAccount"
import { Link } from "react-router-dom"
import { useState } from "react"

const AccountList = ({ accounts }) => {

    var [account, setAcount] = useState({})
    let dispActs = []
    if (!Array.prototype.slice.call(accounts).length === 0) {
        console.log('account checks as empty, dispActs: ', dispActs)
        return null
    } else {
        console.log('accounts has more than 0, dispActs: ', dispActs)
        dispActs = [].slice.call(accounts)
        console.log('after dispActs is set: ', dispActs)

        return (
            <>
                <Table striped bordered hover shadow>
                    <thead>
                        <tr>
                            <th>Nickname</th>
                            <th>Balance</th>
                            <th>Interest</th>
                            <th>Date Created</th>
                            <th>Type</th>
                            <th>Review Account</th>
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
                                <Link to={'/accounts/single/' + account.accountId}>
                                    <Button
                                        variant="outline-success"
                                        type={'submit'}
                                        id='Review'
                                    >Check Account</Button>
                                </Link>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </>
        )
    }
}
export default AccountList