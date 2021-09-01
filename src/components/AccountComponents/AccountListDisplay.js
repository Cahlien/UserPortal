import { Table, Button, } from "react-bootstrap"
import { Link } from "react-router-dom"
import {CurrencyValue} from "../../models/currencyvalue.model";

const AccountList = ({ accounts }) => {

    let dispActs = []

    if (!Array.prototype.slice.call(accounts).length === 0) {
        return null
    } else {
        dispActs = [].slice.call(accounts)

        return (
            <div>
                <Table striped bordered hover style={{ marginRight: 5 + 'px' }}>
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
                            <tr key={index}>
                                <td>{account.nickname}</td>
                                <td>{CurrencyValue.from(account.balance).toString()}</td>
                                <td>{account.interest}%</td>
                                <td>{account.createDate}</td>
                                <td>{account.type}</td>
                                <Link to={'/accounts/single/' + account.accountId}>
                                    <Button
                                        variant="success"
                                        type={'submit'}
                                        id='Review'
                                    >Review Account</Button>
                                </Link>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    }
}
export default AccountList
