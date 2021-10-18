import AuthContext from "../../store/auth-context";
import {useContext, useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import {CurrencyValue} from "../../models/currencyvalue.model";
import Pagination from '@material-ui/lab/Pagination';

function TransactionsList(props) {
    const authContext = useContext(AuthContext);
    const url = props.url;
    const transactions = props.transactions;
    const pageSizes = [5, 10, 15, 20, 25, 50];
    const [pageSize, setPageSize] = useState(5);
    const [sortBy, setSortBy] = useState("date,asc");
    const [searchCriteria, setSearchCriteria] = useState("id,asc");
    const [numberOfPages, setNumberOfPages] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        console.log("Effect called.");
        console.log(url)
    })

    function handlePageSizeChange() {

    }

    function getList() {

    }

    function handleSearchCriteriaChange() {

    }

    function handlePageChange() {

    }

    return (
        <div className={'mt-0'}>
            <div>
                <div className={'mt-5'}>
                    <div>
                        <div className={'input-group mb-3'}>
                            <div className={'me-5 col-xs-12 col-lg-2'}>
                            <span className={'align-middle'}>
                                {'Items per Page: '}
                            </span>
                                <select data-testid={'pageSizeSelector'} className={'text-center align-middle'}
                                        onChange={handlePageSizeChange}
                                        value={pageSize}>
                                    {pageSizes.map((size) => (
                                        <option key={size} value={size}>{size}</option>
                                    ))}
                                </select>
                            </div>
                            <span className={'text-center col-sm-0 col-md-4 col-lg-6'}/>
                            <input type={'text'} className={'form-control'} placeholder={'Search'}
                                   value={searchCriteria}
                                   onChange={handleSearchCriteriaChange}/>
                            <button className={'btn btn-outline-secondary'} type={'button'} onClick={getList}
                                    id={'searchBar'}>Search
                            </button>
                        </div>
                    </div>
                </div>
                <div>
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
                <Pagination className={'my-3'} count={numberOfPages} page={currentPage} siblingCount={1}
                            boundaryCount={1} onChange={handlePageChange}/>
            </div>
        </div>
    )
}

export default TransactionsList;
