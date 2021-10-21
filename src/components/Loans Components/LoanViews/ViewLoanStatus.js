import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import axios from "axios";
import AuthContext from "../../../store/auth-context";
import { Table, Modal, Button } from "react-bootstrap";
import { CurrencyValue } from '../../../models/currencyvalue.model';
import { Dropdown } from 'react-bootstrap';
import './styles.css'

function ViewLoanStatus() {
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const userId = authContext.userId;
    const enteredValue = useRef();
    //page items
    const [typeTitle, setTitle] = useState("Select Payment Account");
    const [availableLoans, setavailableLoans] = useState([]);
    const [loansDisplayed, setLoansDisplayed] = useState(false);
    const [availableAccounts, setAvailableAccounts] = useState([]);
    const [paymentAccount, setPaymentAccount] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [searchCriteria, setSearchCriteria] = useState("");
    const [sortBy, setSortBy] = useState("id,asc" + "," + userId);
    const [maxPayment, setMaxPayment] = useState(1000);
    const [searchCriteriaChanged, setSearchCriteriaChanged] = useState(false);
    const [sortByTypeName, setSortByTypeName] = useState({ active: false, name: 'loanType_typeName', direction: 'asc' });
    const [sortByDescription, setSortByDescription] = useState({ active: false, name: 'loanType_description', direction: 'asc' });
    const [sortByInterest, setSortByInterest] = useState({ active: false, name: 'loanType_apr', direction: 'asc' });
    const [sortByCreateDate, setSortByCreateDate] = useState({ active: false, name: 'createDate', direction: 'asc' });
    const [sortByNextPay, setSortByNextPay] = useState({ active: false, name: 'nextDueDate', direction: 'asc' });
    const [sortByPrincipal, setSortByPrincipal] = useState({ active: false, name: 'principal', direction: 'asc' });
    const [sortByValueTitle, setsortByValueTitle] = useState({ active: false, name: 'valueTitle', direction: 'asc' });
    const [currentLoan, setCurrentLoan] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [pay, setPay] = useState(false);
    const handleClosePayment = () => setPay(false);
    const url = 'http://localhost:9001/loans/me';
    const [numberOfPages, setNumberOfPages] = useState(10);
    const pageSizes = [5, 10, 15, 20, 25, 50, 100]

    const getList = useCallback(async () => {
        if (searchCriteria === "") {
            setSearchCriteria('');
        }
        console.log("search: ", searchCriteria);
        let params = null;
        if (searchCriteria !== '') {
            params = {
                page: currentPage === 0 ? 0 : currentPage - 1,
                size: pageSize,
                sortBy: sortBy,
                search: searchCriteria,
                userId: userId
            };
        } else {
            params = { page: currentPage === 0 ? 0 : currentPage - 1, size: pageSize, sortBy: sortBy, userId: userId };
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

        if (list.data.content !== availableLoans) {
            console.log('list content found: ', list.data.content);
            if (searchCriteriaChanged) {
                setCurrentPage(1);
                setSearchCriteriaChanged(false);
            }

            setLoansDisplayed(true);
            setavailableLoans(list.data.content);
            setNumberOfPages(list.data.totalPages);
            setCurrentLoan(availableLoans[0]);
        }

    }, [availableLoans, searchCriteriaChanged, token, pageSize, currentPage, searchCriteria, sortBy]);

    useEffect(() => {
        if (!loansDisplayed) {
            getList();
            getAccounts();
        }

    }, [getList, availableLoans, loansDisplayed, token, url]);

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
        setCurrentLoan(props);
        console.log('currentLoan: ', currentLoan);
        setShow(true);
    }

    function handleShowPayment() {
        console.log('handle show pay')
        setPay(true);
        getAccounts();
    }

    async function getAccounts() {
        console.log('get accounts')
        let params = { page: currentPage === 0 ? 0 : currentPage - 1, size: 10, sortBy: sortBy, userId: userId };
        if (!pay) {
            const list = await axios.get("http://localhost:9001/accounts", {
                params,
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            });
            if (list.data.content !== availableAccounts) {
                setAvailableAccounts(list.data.content);
                console.log('list found: ', list)
                console.log('accounts set: ', availableAccounts)
            }
        }
    }

    async function makePayment(event) {
        event.preventDefault();

        const desiredValue = enteredValue.current.value
        console.log('desired value: ', desiredValue)
        let d = Math.abs(Math.trunc(parseFloat(desiredValue)))
        let c = Math.abs(Math.trunc(((parseFloat(desiredValue) * 100) % 100)))
        if (d < 0) { d *= -1 }
        if (c < 0) { c *= -1 }
        const cv = new CurrencyValue(true, d, c)
        const loanBalance = new CurrencyValue(currentLoan.balance.negative, currentLoan.balance.dollars, currentLoan.balance.cents)
        console.log('entered value dollars: ', Math.abs(Math.trunc(parseFloat(desiredValue))))
        console.log('entered value cents: ', Math.abs(Math.trunc(((parseFloat(desiredValue) * 100) % 100))))
        var a = currentLoan.balance.dollars.toString() +  '.' + (currentLoan.balance.cents / 100).toString()
        console.log('current loan: ', loanBalance.toString())
        console.log('new cv: ', cv.toString())
        
        let confirmPayment = false;
        let canPay = false;
        console.log('current max payment: ', maxPayment)
        if (paymentAccount.balance.negative) {
            console.log('account negative')
            canPay = false
            setMaxPayment(0);
            console.log('adjusted max payment: ', maxPayment)
        } else {
            console.log('allowing payment...')
            canPay = true;
        }
        if (desiredValue > maxPayment) {
            console.log('cv compare to maxpayment equals -1')
            confirmPayment = window.confirm('Attempted to pay with more than available in account!\nWIP: Overdraw?')
            cv.dollars = paymentAccount.balance.dollars;
            cv.cents = paymentAccount.balance.cents
        }
        cv.negative = false;
        confirmPayment = window.confirm("Are you sure you want to pay " + cv.toString() + " towards your loan of " + loanBalance.toString() + '\nWIP: Confirm Credentials?')
        cv.negative = true;
        console.log('currency value body: ', cv.toString())
        console.log('payment loan set to: ', currentLoan)
        console.log('confirm payment: ', confirmPayment)
        console.log('canPay: ', canPay)
        if (canPay && confirmPayment) {
            console.log('canPay true')
        const res = await axios.post(('http://localhost:9001/accounts/' + userId + '/' + paymentAccount.id),
            cv,
            {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            }
        )
        const res2 = await axios.post(('http://localhost:9001/loans/' + userId + '/' + currentLoan.id),
            cv,
            {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            }
        )
        console.log('account payment response: ', res)
        console.log('loan payment response: ', res2)
        }
        // window.location.reload();
    }

    function dropHandler(dropInput) {
        setMaxPayment((availableAccounts[dropInput].balance.dollars + (availableAccounts[dropInput].balance.cents / 100)))
        setPaymentAccount(availableAccounts[dropInput])
        console.log('drop handler accessed by: ', dropInput)
        setTitle(availableAccounts[dropInput].nickname + ': ' + CurrencyValue.from(availableAccounts[dropInput].balance).toString())
        console.log('payment account set to: ', paymentAccount)
        console.log('max payment set: ', maxPayment)
    }

    function addToSort(event) {
        let sort = '';
        let field = {};
        console.log('available loans: ', availableLoans);

        if (event.target.id === 'loanType_typeName') {
            if (sortByTypeName.active === true) {
                field = toggleDirection(sortByTypeName);
                sort = field.name + ',' + field.direction + ',';
            } else {
                setSortByTypeName({ active: true, name: 'loanType_typeName', direction: 'asc' });
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

        if (event.target.id === 'loanType_description') {
            if (sortByDescription.active === true) {

                field = toggleDirection(sortByDescription);
                sort = field.name + ',' + field.direction + ',' + userId;
            } else {
                setSortByDescription({ active: true, name: 'loanType_description', direction: 'asc' });
                sort = sortByDescription.name + ',' + sortByDescription.direction + ',' + authContext.userId;
            }

            if (setSortByTypeName.active === true) {
                sort += +',' + setSortByTypeName.name + ',' + setSortByTypeName.direction;
            }

            if (sortByTypeName.active === true) {
                sort += ',' + sortByTypeName.name + ',' + sortByTypeName.direction;
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

        if (event.target.id === 'loanType_apr') {
            if (sortByInterest.active === true) {

                field = toggleDirection(sortByInterest);
                sort = field.name + ',' + field.direction + ',' + userId;
            } else {
                setSortByInterest({ active: true, name: 'loanType_apr', direction: 'asc' });
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

        if (event.target.id === 'principal') {
            if (sortByPrincipal.active === true) {

                field = toggleDirection(sortByPrincipal);
                sort = field.name + ',' + field.direction + ',' + userId;
            } else {
                setSortByPrincipal({ active: true, name: 'principal', direction: 'asc' });
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

        if (event.target.id === 'valueTitle') {
            if (sortByValueTitle.active === true) {
                field = toggleDirection(sortByValueTitle);
                sort = field.name + ',' + field.direction + ',' + userId;
            } else {
                setsortByValueTitle({ active: true, name: 'valueTitle', direction: 'asc' });
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

        if (event.target.id === 'nextDueDate') {
            if (sortByNextPay.active === true) {
                field = toggleDirection(sortByNextPay);
                sort = field.name + ',' + field.direction + ',' + userId;
            } else {
                setSortByNextPay({ active: true, name: 'nextDueDate', direction: 'asc' });
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
                sort = field.name + ',' + field.direction + ',' + userId;
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
        <section className={'container'}>
            <h1 className={'text-center mt-5'}>Your Loans:</h1>
            <div className={'mt-5'}>
                <div>
                    <div className={'input-group mb-3'}>
                        <div className={'me-5 col-xs-12 col-lg-2'}>
                            <span className={'align-middle'}>
                                {'Items per Page: '}
                            </span>
                            <select data-testid={'pageSizeSelector'} className={'text-center align-middle'} onChange={handlePageSizeChange}
                                value={pageSize}>
                                {pageSizes.map((size) => (
                                    <option key={size} value={size}>{size}</option>
                                ))}
                            </select>
                        </div>
                        <span className={'text-center col-sm-0 col-md-4 col-lg-6'} />
                        <input type={'text'} className={'form-control'} placeholder={'Search'} value={searchCriteria}
                            onChange={handleSearchCriteriaChange} />
                        <button className={'btn btn-outline-secondary'} type={'button'} onClick={getList}
                            id={'searchBar'}>Search
                        </button>
                    </div>
                </div>
                <Table striped bordered hover className={'me-3 table-responsive'} data-sortable={'true'}
                    data-toggle={'table'} id={'table'}>
                    <thead>
                        <tr>
                            <th className={'align-middle text-center'} data-sortable={'true'}
                                scope={'col'} onClick={addToSort}
                                id={'loanType_typeName'}>Loan Type
                                {sortByTypeName.active === true && (sortByTypeName.direction === 'asc' ? '  ↑' : '  ↓')}
                            </th>
                            <th data-sortable={'true'} scope={'col'} id={'loanType_description'} onClick={addToSort}>
                                Description
                                {sortByDescription.active === true && (sortByDescription.direction === 'asc' ? '  ↑' : '  ↓')}
                            </th>
                            <th className={'align-middle text-center'} data-sortable={'true'} scope={'col'}
                                id={'loanType_apr'} onClick={addToSort}>Interest Rate
                                {sortByInterest.active === true && (sortByInterest.direction === 'asc' ? '  ↑' : '  ↓')}
                            </th>
                            <th className={'align-middle text-center'} data-sortable={'true'} scope={'col'}
                                id={'valueTitle'} onClick={addToSort}>Original Principal
                                {sortByValueTitle.active === true && (sortByValueTitle.direction === 'asc' ? '  ↑' : '  ↓')}
                            </th>
                            <th className={'align-middle text-center'} data-sortable={'true'} scope={'col'}
                                id={'principal'} onClick={addToSort}>Balance Owed
                                {sortByPrincipal.active === true && (sortByPrincipal.direction === 'asc' ? '  ↑' : '  ↓')}
                            </th>
                            <th className={'align-middle text-center'} data-sortable={'true'} scope={'col'}
                                id={'nextDueDate'} onClick={addToSort}>Next Payment Due
                                {sortByNextPay.active === true && (sortByNextPay.direction === 'asc' ? '  ↑' : '  ↓')}
                            </th>
                            <th className={'align-middle text-center'} data-sortable={'true'} scope={'col'}
                                id={'nextDueDate'} onClick={addToSort}>Paid Status
                                {sortByNextPay.active === true && (sortByNextPay.direction === 'asc' ? '  ↑' : '  ↓')}
                            </th>
                            <th className={'align-middle text-center'} data-sortable={'true'} scope={'col'}
                                id={'nextDueDate'} onClick={addToSort}>Minimum Due
                                {sortByNextPay.active === true && (sortByNextPay.direction === 'asc' ? '  ↑' : '  ↓')}
                            </th>
                            <th className={'align-middle text-center'} data-sortable={'true'} scope={'col'}
                                id={'nextDueDate'} onClick={addToSort}>Late Fee
                                {sortByNextPay.active === true && (sortByNextPay.direction === 'asc' ? '  ↑' : '  ↓')}
                            </th>
                            <th className={'align-middle text-center'} data-sortable={'true'} scope={'col'}
                                id={'createDate'} onClick={addToSort}>Date Created
                                {sortByCreateDate.active === true && (sortByCreateDate.direction === 'asc' ? '  ↑' : '  ↓')}
                            </th>
                            <th className={'align-middle text-center'}>
                                Loan Interaction
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {(availableLoans ?? []).map((loan, index) => (
                            <tr key={index}>
                                <td className={'align-middle text-center'}>{loan.loanType.typeName}</td>
                                <td className={'align-middle'}>{loan.loanType.description}</td>
                                <td className={'align-middle text-center'}>{loan.loanType.apr + '%'}</td>
                                <td className={'align-middle text-center'}>{CurrencyValue.from(loan.principal).toString()}</td>
                                <td className={'align-middle text-center'}>{CurrencyValue.from(loan.balance).toString()}</td>
                                <td className={'align-middle text-center'}>{loan.nextDueDate}</td>
                                <td className={'align-middle text-center'}>{loan.hasPaid == true ? 'You\'ve paid!' : 'Yet to Pay.'}</td>
                                <td className={'align-middle text-center'}>{CurrencyValue.from(loan.minDue).toString()}</td>
                                <td className={'align-middle text-center'}>{CurrencyValue.from(loan.lateFee).toString()}</td>
                                <td className={'align-middle text-center'}>{loan.createDate}</td>
                                <td className={'align-middle text-center'}>
                                    <button className={'btn btn-primary btn mx-3'}
                                        id={'reviewBtn'}
                                        onClick={() =>
                                            prepModal(loan)}>
                                        Review/Pay
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                    {currentLoan !== undefined &&
                        <Modal show={show} onHide={handleClose} contentClassName="modal-style">
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    Your {currentLoan.loanType.typeName} Loan:
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="form-group">
                                    <div className="mb-2">
                                        <label id="typeLabel" className="form-label">Type:</label>
                                        <input id="typeText" type="text" disabled={true} className="form-control" value={currentLoan.loanType.typeName}></input>
                                    </div>
                                    <div className="mb-2">
                                        <label id="descriptionLabel" className="form-label">Description:</label>
                                        <p id="descriptionText" className="form-body">
                                            {currentLoan.loanType.description}
                                        </p>
                                    </div>
                                    <div className="mb-2">
                                        <label id="interestLabel" className="form-label">Interest:</label>
                                        <input id="interestText" className="form-control" type="text" disabled={true} value={currentLoan.loanType.apr + '%'}></input>
                                    </div>
                                    <div className="mb-2">
                                        <label id="amountLabel" className="form-label">Balance:</label>
                                        <input id="amountText" className="form-control" type="text" disabled={true} value={CurrencyValue.from(currentLoan.balance).toString()}></input>
                                    </div>
                                    <div className="mb-2">
                                        <label id="principalLabel" className="form-label">Principal:</label>
                                        <input id="principalText" className="form-control" type="text" disabled={true} value={CurrencyValue.from(currentLoan.principal).toString()}></input>
                                    </div>
                                    <div className="mb-2">
                                        <label id="principalLabel" className="form-label">Normal Minimum Payment:</label>
                                        <input id="principalText" className="form-control" type="text" disabled={true} value={currentLoan.minMonthFee}></input>
                                    </div>
                                    <div className="mb-2">
                                        <label id="principalLabel" className="form-label">Current Minimum Owed:</label>
                                        <input id="principalText" className="form-control" type="text" disabled={true} value={CurrencyValue.from(currentLoan.minDue).toString()}></input>
                                    </div>
                                    <div className="mb-2">
                                    </div>
                                    <div className="mb-2">
                                        <label id="nextDueDateLabel" className="form-label">Next Payment Due Date:</label>
                                        <input id="nextDueDateText" className="form-control" type="text" disabled={true} value={currentLoan.nextDueDate}></input>
                                    </div>
                                    <div className="mb-2">
                                        <label id="createDateLabel" className="form-label">Date Created:</label>
                                        <input id="createDateText" className="form-control" type="text" disabled={true} value={currentLoan.createDate}></input>
                                    </div>
                                    {pay === true &&
                                        <div>
                                            <label id="createDateLabel" className="form-label">Source Account:</label>
                                            <Dropdown onSelect={function (evt) { dropHandler(evt) }} required>
                                                <Dropdown.Toggle variant="success" id="dropdown-basic" data-toggle="dropdown">
                                                    {typeTitle}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu required>
                                                    {(availableAccounts ?? []).map((account, index) => (
                                                        <Dropdown.Item eventKey={index}>{account.nickname}: {CurrencyValue.from(account.balance).toString()}</Dropdown.Item>
                                                    ))}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            {maxPayment !== null &&
                                                <div>
                                                    <label id="createDateLabel" className="form-label">Payment Amount:</label><br></br>
                                                    $<input type="number" step="0.01" min="0" max={maxPayment} ref={enteredValue} ></input>
                                                </div>
                                            }
                                        </div>}
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                {pay === false &&
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                }
                                {pay === true &&
                                    <Button variant="secondary" onClick={handleClose, handleClosePayment}>
                                        Cancel
                                    </Button>
                                }
                                {pay === false &&
                                    <Button variant="primary" onClick={handleShowPayment}>
                                        Make a Payment
                                    </Button>
                                } {pay === true && paymentAccount &&
                                    <Button variant="primary" onClick={makePayment}>
                                        Confirm Payment
                                    </Button>
                                }
                            </Modal.Footer>
                        </Modal>
                    }
                </Table>
                <Pagination className={'my-3'} count={numberOfPages} page={currentPage} siblingCount={1}
                    boundaryCount={1} onChange={handlePageChange} />
            </div >
            <script>$('#table').DataTable()</script>
        </section >
    );
}

export default ViewLoanStatus;