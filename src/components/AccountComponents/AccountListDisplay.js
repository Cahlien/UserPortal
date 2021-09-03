import { Table, Button, } from "react-bootstrap"
import { Link } from "react-router-dom"
import {CurrencyValue} from "../../models/currencyvalue.model";
import {AccountType} from "../../models/accounttype.model";

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
                                <td>
                                    {account.createDate.slice(8, 10) + '/' +
                                account.createDate.slice(5, 7) + '/' +
                                account.createDate.slice(0, 4)}
                                </td>
                                <td>{account.type.name}</td>
                                <Link to={'/accounts/single/' + account.id}>
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
