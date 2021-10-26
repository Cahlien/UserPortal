import React, { useCallback, useContext, useEffect, useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import axios from "axios";
import AuthContext from '../../store/auth-context';
import { Table, Modal, Button } from "react-bootstrap";
import {CurrencyValue} from "../../models/currencyvalue.model";
import {AccountType} from "../../models/accounttype.model";
import DefaultTable from '../LayoutComponents/DefaultTable';

const AccountList = ({ accounts }) => {
const authContext = useContext(AuthContext);
const token = authContext.token;
const userId = authContext.userId;
//page items
const [availableAccounts, setavailableAccounts] = useState([]);
const [loansDisplayed, setLoansDisplayed] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const [pageSize, setPageSize] = useState(5);
const [rows, setRows] = useState([]);
const [searchCriteria, setSearchCriteria] = useState("");
const [sortBy, setSortBy] = useState("Id");
const [searchCriteriaChanged, setSearchCriteriaChanged] = useState(false);
const [sortByTypeName, setSortByTypeName] = useState({ active: false, name: 'type_name', direction: 'asc' });
const [sortByDescription, setSortByDescription] = useState({ active: false, name: 'type_description', direction: 'asc' });
const [sortByInterest, setSortByInterest] = useState({ active: false, name: 'interest', direction: 'asc' });
const [sortByCreateDate, setSortByCreateDate] = useState({ active: false, name: 'createDate', direction: 'asc' });
const [sortByNextPay, setSortByNextPay] = useState({ active: false, name: 'nickname', direction: 'asc' });
const [sortByPrincipal, setSortByPrincipal] = useState({ active: false, name: 'type_description', direction: 'asc' });
const [sortByValueTitle, setsortByValueTitle] = useState({ active: false, name: 'balance', direction: 'asc' });
const [currentAccount, setCurrentAccount] = useState();
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const url = 'http://localhost:9001/accounts'
const [numberOfPages, setNumberOfPages] = useState(10);
const pageSizes = [5, 10, 15, 20, 25, 50, 100]
const headers = ['Account Type', 'Nickname', 'Interest Rate', 'Balance', 'Description', 'Date Created']
const headerId = ['type_name', 'nickname', 'interest', 'balance', 'description', 'create_date']
const titles = []

for (var i = 0; i < headers.length; i++) {
    var title = {
        title: headers[i],
        direction: 'asc',
        active: false,
        id: headerId[i],
        sequence: i
    }
    titles.push(title);
}

const getList = useCallback(async () => {
    if (searchCriteria === "") {
        setSearchCriteria('');
    }
    console.log("search: ", searchCriteria);
    let params = null;
    if (searchCriteria !== '') {
        params = {
            pageNum: currentPage === 0 ? 0 : currentPage - 1,
            pageSize: pageSize,
            sortName: sortBy,
            sortDir: sortByTypeName.direction,
            search: searchCriteria,
            userId: userId
        };
    } else {
        params = { userId: userId, pageNum: currentPage === 0 ? 0 : currentPage - 1, pageSize: pageSize, sortName: sortBy, sortDir: sortByTypeName.direction, search: searchCriteria };
    }

    console.log('params: ', params);
    const list = await axios.get(url, {
        params: params,
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    });
    console.log("outbound url: ", url);
    console.log('inbound response: ', list);

    if (list.data.content !== availableAccounts) {
        console.log('list data found: ', list.data);
        if (searchCriteriaChanged) {
            setCurrentPage(1);
            setSearchCriteriaChanged(false);
        }
        setLoansDisplayed(true);
        setavailableAccounts(list.data.content);
        setNumberOfPages(list.data.totalPages);
        setCurrentAccount(availableAccounts[0]);
        console.log('list size: ', list.data.size)
        const row = []
        for (let i = 0; i < list.data.size; i++) {
            console.log('reading: ', list.data.content[i])
            row.push(
            <tr><td className={'align-middle text-center'} >{list.data.content[i].type.name}</td> 
            <td className={'align-middle text-center'} >{list.data.content[i].nickname}</td> 
            <td className={'align-middle text-center'} >{list.data.content[i].interest}%</td> 
            <td className={'align-middle text-center'} >{CurrencyValue.from(list.data.content[i].balance).toString()}</td> 
            <td className={'align-middle text-center'} >{list.data.content[i].type.description}</td> 
            <td className={'align-middle text-center'} >{list.data.content[i].createDate}</td>
            <td className={'align-middle text-center'}>
                        <button className={'btn btn-primary btn mx-3'}
                            id={'reviewBtn'}>
                            Review/Pay
                        </button>
                        </td></tr>)
                        rows.push(row)
        }
        setRows(row)
        console.log('outbound rows:...................', rows)
    }
}, [availableAccounts, searchCriteriaChanged, token, pageSize, currentPage, searchCriteria, sortBy, rows]);

// useEffect(() => {
//     if (!loansDisplayed) {
//         getList();
//     }

// }, [getList, availableAccounts, loansDisplayed, token, url]);

function handlePageChange(event, value) {
    event.preventDefault();
    setLoansDisplayed(false);
    if (searchCriteriaChanged) {
        setCurrentPage(1);
    } else {
        setCurrentPage(value);
    }

}

function handleSearchCriteriaChange(event) {
    setSearchCriteriaChanged(true);
    setSearchCriteria(event.target.value);
}

function handlePageSizeChange(event) {
    setLoansDisplayed(false);
    setPageSize(event.target.value);
    setCurrentPage(1);
}

function prepModal(props) {
    console.log('modal prep inbound: ', props);
    setCurrentAccount(props);
    console.log('currentAccount: ', currentAccount);
    setShow(true);
}

function addToSort(event) {
    let sort = '';
    let field = {};
    console.log('available loans: ', availableAccounts);

    if (event.target.id === 'type_name') {
        if (sortByTypeName.active === true) {
            field = toggleDirection(sortByTypeName);
            sort = field.name + ',' + field.direction;
        } else {
            setSortByTypeName({ active: true, name: 'type_name', direction: 'asc' });
            sort = sortByTypeName.name + ',' + sortByTypeName.direction + ',' + authContext.userId;
        }

        if (sortByDescription.active === true) {
            sort += ',' + sortByDescription.name + ',' + sortByDescription.direction;
        }

        if (sortByInterest.active === true) {
            sort += +',' + sortByInterest.name + ',' + sortByInterest.direction;
        }

        if (sortByValueTitle.active === true) {
            sort += ',' + sortByValueTitle.name + ',' + sortByValueTitle.direction;
        }

        if (sortByPrincipal.active === true) {
            sort += ',' + sortByPrincipal.name + ',' + sortByPrincipal.direction;
        }

        if (sortByNextPay.active === true) {
            sort += ',' + sortByNextPay.name + ',' + sortByNextPay.direction;
        }

        if (sortByCreateDate.active === true) {
            sort += ',' + sortByCreateDate.name + ',' + sortByCreateDate.direction;
        }
    }

    if (event.target.id === 'interest') {
        if (sortByInterest.active === true) {

            field = toggleDirection(sortByInterest);
            sort = field.name + ',' + field.direction;
        } else {
            setSortByInterest({ active: true, name: 'interest', direction: 'asc' });
            sort = sortByInterest.name + ',' + sortByInterest.direction + ',' + authContext.userId;
        }

        if (sortByDescription.active === true) {
            sort += ',' + sortByDescription.name + ',' + sortByDescription.direction;
        }

        if (sortByTypeName.active === true) {
            sort += +',' + sortByTypeName.name + ',' + sortByTypeName.direction;
        }

        if (sortByValueTitle.active === true) {
            sort += ',' + sortByValueTitle.name + ',' + sortByValueTitle.direction;
        }

        if (sortByPrincipal.active === true) {
            sort += ',' + sortByPrincipal.name + ',' + sortByPrincipal.direction;
        }

        if (sortByNextPay.active === true) {
            sort += ',' + sortByNextPay.name + ',' + sortByNextPay.direction;
        }

        if (sortByCreateDate.active === true) {
            sort += ',' + sortByCreateDate.name + ',' + sortByCreateDate.direction;
        }
    }

    if (event.target.id === 'type_description') {
        if (sortByPrincipal.active === true) {

            field = toggleDirection(sortByPrincipal);
            sort = field.name + ',' + field.direction;
        } else {
            setSortByPrincipal({ active: true, name: 'type_description', direction: 'asc' });
            sort = sortByPrincipal.name + ',' + sortByPrincipal.direction + ',' + authContext.userId;
        }

        if (sortByDescription.active === true) {
            sort += ',' + sortByDescription.name + ',' + sortByDescription.direction;
        }

        if (sortByInterest.active === true) {
            sort += +',' + sortByInterest.name + ',' + sortByInterest.direction;
        }

        if (sortByValueTitle.active === true) {
            sort += ',' + sortByValueTitle.name + ',' + sortByValueTitle.direction;
        }

        if (sortByTypeName.active === true) {
            sort += ',' + sortByTypeName.name + ',' + sortByTypeName.direction;
        }

        if (sortByNextPay.active === true) {
            sort += ',' + sortByNextPay.name + ',' + sortByNextPay.direction;
        }

        if (sortByCreateDate.active === true) {
            sort += ',' + sortByCreateDate.name + ',' + sortByCreateDate.direction;
        }
    }

    if (event.target.id === 'balance') {
        if (sortByValueTitle.active === true) {
            field = toggleDirection(sortByValueTitle);
            sort = field.name + ',' + field.direction;
        } else {
            setsortByValueTitle({ active: true, name: 'balance', direction: 'asc' });
            sort = sortByValueTitle.name + ',' + sortByValueTitle.direction + ',' + authContext.userId;
        }

        if (sortByDescription.active === true) {
            sort += ',' + sortByDescription.name + ',' + sortByDescription.direction;
        }

        if (sortByInterest.active === true) {
            sort += +',' + sortByInterest.name + ',' + sortByInterest.direction;
        }

        if (sortByTypeName.active === true) {
            sort += ',' + sortByTypeName.name + ',' + sortByTypeName.direction;
        }

        if (sortByPrincipal.active === true) {
            sort += ',' + sortByPrincipal.name + ',' + sortByPrincipal.direction;
        }

        if (sortByNextPay.active === true) {
            sort += ',' + sortByNextPay.name + ',' + sortByNextPay.direction;
        }

        if (sortByCreateDate.active === true) {
            sort += ',' + sortByCreateDate.name + ',' + sortByCreateDate.direction;
        }
    }

    if (event.target.id === 'nickname') {
        if (sortByNextPay.active === true) {
            field = toggleDirection(sortByNextPay);
            sort = field.name + ',' + field.direction;
        } else {
            setSortByNextPay({ active: true, name: 'nickname', direction: 'asc' });
            sort = sortByNextPay.name + ',' + sortByNextPay.direction + ',' + authContext.userId;
        }

        if (sortByDescription.active === true) {
            sort += ',' + sortByDescription.name + ',' + sortByDescription.direction;
        }

        if (sortByInterest.active === true) {
            sort += +',' + sortByInterest.name + ',' + sortByInterest.direction;
        }

        if (sortByValueTitle.active === true) {
            sort += ',' + sortByValueTitle.name + ',' + sortByValueTitle.direction;
        }

        if (sortByPrincipal.active === true) {
            sort += ',' + sortByPrincipal.name + ',' + sortByPrincipal.direction;
        }

        if (sortByTypeName.active === true) {
            sort += ',' + sortByTypeName.name + ',' + sortByTypeName.direction;
        }

        if (sortByCreateDate.active === true) {
            sort += ',' + sortByCreateDate.name + ',' + sortByCreateDate.direction;
        }
    }

    if (event.target.id === 'createDate') {
        if (sortByCreateDate.active === true) {
            field = toggleDirection(sortByCreateDate);
            sort = field.name + ',' + field.direction;
        } else {
            setSortByCreateDate({ active: true, name: 'createDate', direction: 'asc' });
            sort = sortByCreateDate.name + ',' + sortByCreateDate.direction + ',' + authContext.userId;
        }

        if (sortByDescription.active === true) {
            sort += ',' + sortByDescription.name + ',' + sortByDescription.direction;
        }

        if (sortByInterest.active === true) {
            sort += +',' + sortByInterest.name + ',' + sortByInterest.direction;
        }

        if (sortByValueTitle.active === true) {
            sort += ',' + sortByValueTitle.name + ',' + sortByValueTitle.direction;
        }

        if (sortByPrincipal.active === true) {
            sort += ',' + sortByPrincipal.name + ',' + sortByPrincipal.direction;
        }

        if (sortByNextPay.active === true) {
            sort += ',' + sortByNextPay.name + ',' + sortByNextPay.direction;
        }

        if (sortByTypeName.active === true) {
            sort += ',' + sortByTypeName.name + ',' + sortByTypeName.direction;
        }
    }

    setLoansDisplayed(false);
    setSortBy(sort);
}

function toggleDirection(field) {
    if (field.direction === 'asc') {
        field.direction = 'desc';
    } else {
        field.direction = 'asc';
    }

    return field;
}

return (
    <>
    <DefaultTable headers={titles} rows={rows} title='Account' url={url}/>
    </>
    // <section className={'container'}>
    //     <h1 className={'text-center mt-5'}>Your Accounts:</h1>
    //     <div className={'mt-5'}>
    //         <div>
    //             <div className={'input-group mb-3'}>
    //                 <div className={'me-5 col-xs-12 col-lg-2'}>
    //                     <span className={'align-middle'}>
    //                         {'Items per Page: '}
    //                     </span>
    //                     <select data-testid={'pageSizeSelector'} className={'text-center align-middle'} onChange={handlePageSizeChange}
    //                         value={pageSize}>
    //                         {pageSizes.map((size) => (
    //                             <option key={size} value={size}>{size}</option>
    //                         ))}
    //                     </select>
    //                 </div>
    //                 <span className={'text-center col-sm-0 col-md-4 col-lg-6'} />
    //                 <input type={'text'} className={'form-control'} placeholder={'Search'} value={searchCriteria}
    //                     onChange={handleSearchCriteriaChange} />
    //                 <button className={'btn btn-outline-secondary'} type={'button'} onClick={getList}
    //                     id={'searchBar'}>Search
    //                 </button>
    //             </div>
    //         </div>
    //         <Table striped bordered hover className={'me-3 table-responsive'} data-sortable={'true'}
    //             data-toggle={'table'} id={'table'}>
    //             <thead>
    //                 <tr>
    //                     <th className={'align-middle text-center'} data-sortable={'true'}
    //                         scope={'col'} onClick={addToSort}
    //                         id={'type_name'}>Account Type
    //                         {sortByTypeName.active === true && (sortByTypeName.direction === 'asc' ? '  ↑' : '  ↓')}
    //                     </th>
    //                     <th data-sortable={'true'} scope={'col'} id={'nickname'} onClick={addToSort}>
    //                         Nickname
    //                         {sortByNextPay.active === true && (sortByNextPay.direction === 'asc' ? '  ↑' : '  ↓')}
    //                     </th>
    //                     <th className={'align-middle text-center'} data-sortable={'true'} scope={'col'}
    //                         id={'interest'} onClick={addToSort}>Interest Rate
    //                         {sortByInterest.active === true && (sortByInterest.direction === 'asc' ? '  ↑' : '  ↓')}
    //                     </th>
    //                     <th className={'align-middle text-center'} data-sortable={'true'} scope={'col'}
    //                         id={'balance'} onClick={addToSort}>Balance
    //                         {sortByValueTitle.active === true && (sortByValueTitle.direction === 'asc' ? '  ↑' : '  ↓')}
    //                     </th>
    //                     <th className={'align-middle text-center'} data-sortable={'true'} scope={'col'}
    //                         id={'type_description'} onClick={addToSort}>Description
    //                         {sortByPrincipal.active === true && (sortByPrincipal.direction === 'asc' ? '  ↑' : '  ↓')}
    //                     </th>
    //                     <th className={'align-middle text-center'} data-sortable={'true'} scope={'col'}
    //                         id={'createDate'} onClick={addToSort}>Date Created
    //                         {sortByCreateDate.active === true && (sortByCreateDate.direction === 'asc' ? '  ↑' : '  ↓')}
    //                     </th>
    //                     <th className={'align-middle text-center'}>
    //                         Account Interaction
    //                     </th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {(availableAccounts ?? []).map((account, index) => (
    //                     <tr key={index}>
    //                         <td className={'align-middle text-center'}>{account.type.name}</td>
    //                         <td className={'align-middle'}>{account.nickname}</td>
    //                         <td className={'align-middle text-center'}>{account.interest+ '%'}</td>
    //                         <td className={'align-middle text-center'}>{CurrencyValue.from(account.balance).toString()}</td>
    //                         <td className={'align-middle text-center'}>{account.type.description}</td>
    //                         <td className={'align-middle text-center'}>{account.createDate}</td>
    //                         <td className={'align-middle text-center'}>
    //                             <button className={'btn btn-primary btn mx-3'}
    //                                 id={'reviewBtn'}
    //                                 onClick={() =>
    //                                     prepModal(account)}>
    //                                 Review/Pay
    //                             </button>
    //                         </td>
    //                     </tr>
    //                 ))}
    //             </tbody>

            //     {currentAccount !== undefined &&
            //         <Modal show={show} onHide={handleClose}>
            //             <Modal.Header closeButton>
            //                 <Modal.Title>
            //                     Your {currentAccount.type.name} Loan:
            //                 </Modal.Title>
            //             </Modal.Header>
            //             <Modal.Body>
            //                 <div className="form-group">
            //                     <div className="mb-2">
            //                         <label id="typeLabel" className="form-label">Type:</label>
            //                         <input id="typeText" type="text" disabled={true} className="form-control" value={currentAccount.type.name}></input>
            //                     </div>
            //                     <div className="mb-2">
            //                         <label id="typeLabel" className="form-label">Nickname:</label>
            //                         <input id="typeText" type="text" disabled={true} className="form-control" value={currentAccount.nickname}></input>
            //                     </div>
            //                     <div className="mb-2">
            //                         <label id="descriptionLabel" className="form-label">Description:</label>
            //                         <p id="descriptionText" className="form-body">
            //                         {currentAccount.type.description}
            //                         </p>
            //                     </div>
            //                     <div className="mb-2">
            //                         <label id="interestLabel" className="form-label">Interest:</label>
            //                         <input id="interestText" className="form-control" type="text" disabled={true} value={currentAccount.interest+ '%'}></input>
            //                     </div>
            //                     <div className="mb-2">
            //                         <label id="amountLabel" className="form-label">Amount:</label>
            //                         <input id="amountText" className="form-control" type="text" disabled={true} value={CurrencyValue.from(currentAccount.balance).toString()}></input>
            //                     </div>
            //                     <div className="mb-2">
            //                         <label id="createDateLabel" className="form-label">Date Created:</label>
            //                         <input id="createDateText" className="form-control" type="text" disabled={true} value={currentAccount.createDate}></input>
            //                     </div>
            //                 </div>
            //             </Modal.Body>
            //             <Modal.Footer>
            //                 <Button variant="secondary" onClick={handleClose}>
            //                     Cancel
            //                 </Button>
            //                 <Button variant="primary">
            //                     Payment Features Here
            //                 </Button>
            //             </Modal.Footer>
            //         </Modal>
            //     }
            // </Table>
    //         <Pagination className={'my-3'} count={numberOfPages} page={currentPage} siblingCount={1}
    //             boundaryCount={1} onChange={handlePageChange} />
    //     </div >
    //     <script>$('#table').DataTable()</script>
    // </section >
);
}

export default AccountList
