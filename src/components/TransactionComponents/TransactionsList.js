import {useHistory, useParams} from "react-router-dom";
import AuthContext from "../../store/auth-context";
import {useContext, useEffect, useState} from "react";
import Pagination from '@material-ui/lab/Pagination';
import {Table} from "react-bootstrap";
import {CurrencyValue} from "../../models/currencyvalue.model";
import axios from "axios";

function TransactionsList(props) {
    console.log('props rcvd: ', props)
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const userId = authContext.userId;
    const url = props.url;
    const [transactions, setTransactions] = useState([]);
    //page items
    const pageSizes = [1, 5, 10, 15, 20, 25, 50, 100];
    const [sortBy, setSortBy] = useState("id,asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [searchCriteria, setSearchCriteria] = useState(props.object);

    useEffect(() => {
        console.log("Effect called.");
        console.log(url)
        getTransactions()
    }, [url])

    async function getTransactions() {
        console.log('getting transactions...')
        const res = await axios.get((url),
                {
                    params: {
                        page: currentPage === 0 ? 0 : currentPage - 1,
                        size: pageSize,
                        sortBy: sortBy,
                        search: searchCriteria
                    },
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    }
                }
            )
            console.log('rcvd: ', res)
            setTransactions(res.data.content)
    }

    return (
            <div className={'mt-0'}>
                <Table striped bordered hover className={'me-3 table-responsive'} data-sortable={'true'}
                       data-toggle={'table'} id={'table'}>
                    <thead>
                        <tr>
                            <th colSpan={'5'} className={'text-center'}>Transactions</th>
                        </tr>
                        <tr>
                            <th className={'align-middle text-center'} data-sortable={'true'}
                                scope={'col'}
                                id={'statusTime'}
                                onClick={props.onSortChanged}>Date
                                {props.sortOrder === 'statusTime,asc' && ' ↑'}
                                {props.sortOrder === 'statusTime,desc' && ' ↓'}
                            </th>
                            <th data-sortable={'true'} scope={'col'} id={'notes'} colSpan={'1'}
                                onClick={props.onSortChanged}>Description
                                {props.sortOrder === 'notes,asc' && ' ↑'}
                                {props.sortOrder === 'notes,desc' && ' ↓'}
                            </th>
                            <th className={'align-middle text-center'} data-sortable={'true'} scope={'col'}
                                id={'transactionAmount.dollars'} onClick={props.onSortChanged}>Amount
                                {props.sortOrder === 'transactionAmount.dollars,asc' && ' ↑'}
                                {props.sortOrder === 'transactionAmount.dollars,desc' && ' ↓'}
                            </th>
                            <th className={'align-middle text-center'}
                                id={'transactionStatus'} onClick={props.onSortChanged}>Status
                                {props.sortOrder === 'transactionStatus,asc' && ' ↑'}
                                {props.sortOrder === 'transactionStatus,desc' && ' ↓'}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {transactions && transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td className={'align-middle text-center'}>{transaction.statusTime.slice(0, 10)}
                            </td>
                            <td className={'align-middle'} colSpan={'1'}>{transaction.notes}</td>
                            <td className={'align-middle text-center'}>{CurrencyValue.from(transaction.transactionAmount).toString()}</td>
                            <td className={'align-middle text-center'}>{transaction.transactionStatus.statusName}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
    )
}

export default TransactionsList;
