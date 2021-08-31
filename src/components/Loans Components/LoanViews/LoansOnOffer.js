import React, { useCallback, useContext, useEffect, useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import axios from "axios";
import { useHistory } from "react-router-dom";
import ActionContext from "../../../store/action-context";
import AuthContext from "../../../store/auth-context";
import { Table, Modal, Button } from "react-bootstrap"
import LoanRegistration from '../LoanSignUp/LoanRegistration';

function LoansOnOffer(props) {
    const history = useHistory();
    const actionContext = useContext(ActionContext);
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const userId = authContext.userId;
    //modal items
    const [applyLoan, setApplyLoan] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    //page items
    const [availableLoans, setavailableLoans] = useState();
    const [loansDisplayed, setLoansDisplayed] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchCriteria, setSearchCriteria] = useState("");
    const [sortBy, setSortBy] = useState("id,asc");
    const [searchCriteriaChanged, setSearchCriteriaChanged] = useState(false);
    const [sortByTypeName, setSortByTypeName] = useState({ active: false, name: 'typeName', direction: 'asc' });
    const [sortByDescription, setSortByDescription] = useState({ active: false, name: 'description', direction: 'asc' });
    const [sortByInterest, setSortByInterest] = useState({ active: false, name: 'baseInterestRate', direction: 'asc' });
    const url = 'http://localhost:9001/loantypes'
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
                search: searchCriteria
            };
        } else {
            params = { page: currentPage === 0 ? 0 : currentPage - 1, size: pageSize, sortBy: sortBy };
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
        console.log('inbound list: ', list)

        if (list.data.content !== availableLoans) {
            if (searchCriteriaChanged) {
                setCurrentPage(1);
                setSearchCriteriaChanged(false);
            }

            setLoansDisplayed(true);
            setavailableLoans(list.data.content);
            setNumberOfPages(list.data.totalPages);
        }
    }, [availableLoans, searchCriteriaChanged, token, pageSize, currentPage, searchCriteria, sortBy]);

    useEffect(() => {
        if (!loansDisplayed) {
            getList();
        }

    }, [getList, availableLoans, loansDisplayed, token, url]);

    function applyHandler() {
        console.log('attempting to apply')
        LoanRegistration(applyLoan, userId, token)
        handleClose();
    }

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

    function addToSort(event) {
        let sort = '';
        let field = { };

        if (event.target.id === 'typeName') {
            if (sortByTypeName.active === true) {
                field = toggleDirection(sortByTypeName);
                sort = field.name + ',' + field.direction;
            } else {
                setSortByTypeName({ active: true, name: 'typeName', direction: 'asc' });
                sort = sortByTypeName.name + ',' + sortByTypeName.direction;
            }

            if (sortByDescription.active === true) {
                sort += ',' + sortByDescription.name + ',' + sortByDescription.direction;
            }

            if (sortByInterest.active === true) {
                sort += +',' + sortByInterest.name + ',' + sortByInterest.direction;
            }
        }

        if (event.target.id === 'description') {
            if (sortByDescription.active === true) {

                field = toggleDirection(sortByDescription);
                sort = field.name + ',' + field.direction;
            } else {
                setSortByDescription({ active: true, name: 'description', direction: 'asc' });
                sort = sortByDescription.name + ',' + sortByDescription.direction;
            }

            if (setSortByTypeName.active === true) {
                sort += +',' + setSortByTypeName.name + ',' + setSortByTypeName.direction;
            }

            if (sortByTypeName.active === true) {
                sort += ',' + sortByTypeName.name + ',' + sortByTypeName.direction;
            }
        }

        if (event.target.id === 'apr') {
            if (sortByInterest.active === true) {

                field = toggleDirection(sortByInterest);
                sort = field.name + ',' + field.direction;
            } else {
                setSortByInterest({ active: true, name: 'apr', direction: 'asc' });
                sort = sortByInterest.name + ',' + sortByInterest.direction;
            }

            if (sortByTypeName.active === true) {
                sort += ',' + sortByTypeName.name + ',' + sortByTypeName.direction;
            }

            if (sortByDescription.active === true) {
                sort += ',' + sortByDescription.name + ',' + sortByDescription.direction;
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
            <h1 className={'text-center mt-5'}>The Loans of BeardTrust</h1>
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
                                id={'typeName'}>Loan
                                {sortByTypeName.active === true && (sortByTypeName.direction === 'asc' ? '  ↑' : '  ↓')}
                            </th>
                            <th data-sortable={'true'} scope={'col'} id={'description'} onClick={addToSort}>Description
                                {sortByDescription.active === true && (sortByDescription.direction === 'asc' ? '  ↑' : '  ↓')}
                            </th>
                            <th className={'align-middle text-center'} data-sortable={'true'} scope={'col'}
                                id={'apr'} onClick={addToSort}>Interest Rate
                                {sortByInterest.active === true && (sortByInterest.direction === 'asc' ? '  ↑' : '  ↓')}
                            </th>
                            <th className={'align-middle text-center'}>Sign Up</th>
                        </tr>
                    </thead>
                    <tbody>
                        {availableLoans && availableLoans.map(loan => (
                            <tr key={loan.id}>
                                <td className={'align-middle text-center'}>{loan.typeName}</td>
                                <td className={'align-middle'}>{loan.description}</td>
                                <td className={'align-middle text-center'}>{loan.apr + '%'}</td>
                                <td className={'align-middle text-center'}>
                                    <button className={'btn btn-primary btn mx-3'} onClick={function (event) { setApplyLoan(loan); setShow(true) }}
                                        id={loan.id}>Apply
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Pagination className={'my-3'} count={numberOfPages} page={currentPage} siblingCount={1}
                    boundaryCount={1} onChange={handlePageChange} />
            </div>
            <script>$('#table').DataTable()</script>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Applying for Loan</Modal.Title>
                </Modal.Header>
                <Modal.Body>Loan Type: {applyLoan ? applyLoan.typeName : null}</Modal.Body>
                <Modal.Body>APR: {applyLoan ? applyLoan.apr : null}%</Modal.Body>
                <Modal.Body>Length: {applyLoan ? applyLoan.numMonths : null} months</Modal.Body>
                <Modal.Body>Description: {applyLoan ? applyLoan.description : null}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => applyHandler()}>
                        Apply for this Loan
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    );
}

export default LoansOnOffer;