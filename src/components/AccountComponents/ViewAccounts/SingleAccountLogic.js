import AuthContext from "../../../store/auth-context";
import SingleAccount from "../SingleAccountDisplay";
import { useParams } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import TransactionsList from "../../TransactionComponents/TransactionsList";
import Pagination from '@material-ui/lab/Pagination';

const AccountSingle = () => {
    const { id } = useParams();
    const [transactions, setTransactions] = useState()
    const authContext = useContext(AuthContext);
    const [account, setAccount] = useState({});
    const token = authContext.token;
    const [pageNumber, setPageNumber] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState();
    const [pageSize, setPageSize] = useState(5);
    const [searchCriteria, setSearchCriteria] = useState();
    const [sortOrder, setSortOrder] = useState('statusTime,desc');
    let searchEntry;
    let transactionUrl = `http://localhost:9001/accounts/transactions/${id}?page=${pageNumber - 1}&size=${pageSize}&sort=${sortOrder}`
    const pageSizes = [5, 10, 15, 20, 25, 50, 100]
    const url = `http://localhost:9001/accounts/${id}`

    const onChangePageSize = (event) => {
        console.log(event.target.value)
        setPageSize(event.target.value)
    }

    const onChangePage = (event, value) => {
        console.log(value)
        setPageNumber(value)
    }

    const onSearchEntered = (event) => {
        searchEntry = event.target.value
    }

    const onSearchClicked = () => {
        setSearchCriteria(searchEntry)
        console.log(searchEntry)
    }

    const onSortChanged = (event) => {
        let sequence = sortOrder.split(',');
        if(sequence[1] === 'asc') {
                sequence = event.target.id + ',desc';
        } else {
                sequence = event.target.id + ',asc';
        }

        console.log(sequence)
        setSortOrder(sequence)
    }

    const loadTransactions = async () => {
        if(searchCriteria !== undefined)
        {
            transactionUrl += `&search=${searchCriteria}`
        }

        if(sortOrder.split(',')[0] === 'transactionAmount.dollars'){
            if(sortOrder.split(',')[1] === 'asc'){
                transactionUrl += '&sort=transactionAmount.cents,asc';
            } else {
                transactionUrl += '&sort=transactionAmount.cents,desc';
            }
        }

        const response = await axios.get(transactionUrl);

        if (response.data) {
            setTransactions(response.data.content)
        }
        setNumberOfPages(response.data.totalPages)
        console.log("State: " + pageNumber + ' ' + pageSize + ' ' + sortOrder + ' ' + searchCriteria)
    }

    useEffect(() =>
            axios.get(
            url,
            {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            })
            .then(async (res) => {
                if (res.statusText === "OK") {
                    console.log('SINGLE VIEW SUCCESSFUL');
                    console.log(res.data)
                    setAccount(res.data);
                } else {
                    console.log('SINGLE VIEW FAILED');
                    console.log('result: ', res)
                }

                await loadTransactions();

            }, [pageNumber, pageSize, sortOrder, searchCriteria])
            .catch((e) => {
                if (e.response === 403) {
                    console.log('VIEW FAILURE: Code 403 (Forbidden). Your login may be expired or your URL may be incorrect.')
                }
                console.log('Error message: ', e.message + ', code: ' + e.response);
            }), [id, url, token, pageNumber, pageSize, searchCriteria, sortOrder, transactionUrl, loadTransactions])

    return (
        <section className={'container'}>
            <div>
                <div className={'mt-5'}>
                    <div>
                        <div className={'input-group mb-3'}>
                            <div className={'me-5 col-xs-12 col-lg-3 ms-1'}>
                                <span className={'align-middle offset-1'}>
                                    {'Transactions per Page: '}
                                </span>
                                <select data-testid={'pageSizeSelector'} className={'text-center align-middle'}
                                        onChange={onChangePageSize}>
                                    {pageSizes.map((size) => (
                                        <option key={size} value={size}>{size}</option>
                                    ))}
                                </select>
                            </div>
                            <span className={'text-center col-sm-0 col-md-4 col-lg-6'}/>
                            <input type={'text'} className={'form-control'} placeholder={'Search'} onChange={onSearchEntered}/>
                            <button className={'btn btn-outline-secondary'} type={'button'}
                                    id={'searchBar'} onClick={onSearchClicked}>Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <ul>
                <SingleAccount accounts={account} />
                <TransactionsList
                    url={transactionUrl}
                    transactions={transactions}
                    onSortChanged={onSortChanged}
                    sortOrder={sortOrder}
                />
                <Pagination className={'my-3'} count={numberOfPages} page={pageNumber} siblingCount={1}
                            boundaryCount={1} onChange={onChangePage}/>
            </ul>
        </section>
    )
}
export default AccountSingle
