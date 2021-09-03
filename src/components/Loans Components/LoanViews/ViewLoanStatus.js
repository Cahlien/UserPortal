import React, { useCallback, useContext, useEffect, useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import axios from "axios";
import AuthContext from "../../../store/auth-context";
import { Table } from "react-bootstrap"

function ViewLoanStatus() {
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const userId = authContext.userId;
    //page items
    const [availableLoans, setavailableLoans] = useState([]);
    const [loansDisplayed, setLoansDisplayed] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchCriteria, setSearchCriteria] = useState("");
    const [sortBy, setSortBy] = useState("loanId,asc," + userId);
    const [searchCriteriaChanged, setSearchCriteriaChanged] = useState(false);
    const [sortByTypeName, setSortByTypeName] = useState({ active: false, name: 'loanType_typeName', direction: 'asc' });
    const [sortByDescription, setSortByDescription] = useState({ active: false, name: 'loanType_description', direction: 'asc' });
    const [sortByInterest, setSortByInterest] = useState({ active: false, name: 'loanType_apr', direction: 'asc' });
    const [sortByCreateDate, setSortByCreateDate] = useState({ active: false, name: 'createDate', direction: 'asc' });
    const [sortByNextPay, setSortByNextPay] = useState({ active: false, name: 'nextDueDate', direction: 'asc' });
    const [sortByPrincipal, setSortByPrincipal] = useState({ active: false, name: 'principal', direction: 'asc' });
    const [sortByValueTitle, setsortByValueTitle] = useState({ active: false, name: 'valueTitle', direction: 'asc' });
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
            };
        } else {
            params = { page: currentPage === 0 ? 0 : currentPage - 1, size: pageSize, sortBy: sortBy};
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
        }
    }, [availableLoans, searchCriteriaChanged, token, pageSize, currentPage, searchCriteria, sortBy]);

    useEffect(() => {
        if (!loansDisplayed) {
            getList();
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

    function addToSort(event) {
        let sort = '';
        let field = { };
        console.log('available loans: ', availableLoans);

        if (event.target.id === 'loanType_typeName') {
            if (sortByTypeName.active === true) {
                field = toggleDirection(sortByTypeName);
                sort = field.name + ',' + field.direction + ',' +  userId;
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
                sort = field.name + ',' + field.direction + ',' +  userId;
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
                sort = field.name + ',' + field.direction + ',' +  userId;
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
                sort = field.name + ',' + field.direction + ',' +  userId;
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
                sort = field.name + ',' + field.direction + ',' +  userId;
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
                    sort = field.name + ',' + field.direction + ',' +  userId;
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
                    sort += ',' + sortByTypeName.name + ',' + sortByTypeName.direction ;
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
            <h1 className={'text-center mt-5'}>Your Loans: (WIP)</h1>
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
                                id={'valueTitle'} onClick={addToSort}>Amount
                                {sortByValueTitle.active === true && (sortByValueTitle.direction === 'asc' ? '  ↑' : '  ↓')}
                            </th>
                            <th className={'align-middle text-center'} data-sortable={'true'} scope={'col'}
                                id={'principal'} onClick={addToSort}>Principal
                                {sortByPrincipal.active === true && (sortByPrincipal.direction === 'asc' ? '  ↑' : '  ↓')}
                            </th>
                            <th className={'align-middle text-center'} data-sortable={'true'} scope={'col'}
                                id={'nextDueDate'} onClick={addToSort}>Next Payment Due
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
                        {availableLoans && availableLoans.map(loan => (
                            <tr key={loan.loanId}>
                                <td className={'align-middle text-center'}>{loan.loanType.typeName}</td>
                                <td className={'align-middle'}>{loan.loanType.description}</td>
                                <td className={'align-middle text-center'}>{loan.loanType.apr + '%'}</td>
                                <td className={'align-middle text-center'}>{'$' + loan.currencyValue.dollars + '.' + loan.currencyValue.cents}</td>
                                <td className={'align-middle text-center'}>{loan.principal}</td>
                                <td className={'align-middle text-center'}>{loan.nextDueDate}</td>
                                <td className={'align-middle text-center'}>{loan.createDate}</td>
                                <td className={'align-middle text-center'}>
                                    <button className={'btn btn-primary btn mx-3'}
                                        id={loan.id}>Review
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
        </section>
    );
}

export default ViewLoanStatus;