import { Table, Modal } from "react-bootstrap";
import Pagination from '@material-ui/lab/Pagination';
import { useState, useEffect, useCallback, useContext } from "react";
import AuthContext from "../../store/auth-context";
import axios from "axios";
import { CurrencyValue } from "../../models/currencyvalue.model";
import RowBuilder from "./RowBuilder";
import { List } from "@material-ui/core";
import AccountModal from "../AccountComponents/AccountModal";
import LoanModal from "../Loans Components/LoanModal";
import { useHistory } from "react-router";

const DefaultTable = (props) => {
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const userId = authContext.userId;
    const url = props.url
    const pageTitle = props.title
    const history = useHistory();
    const [availableObjects, setAvailableObjects] = useState([]);
    const [currentObject, setCurrentObject] = useState();
    const [numberOfPages, setNumberOfPages] = useState(5);
    const pageSizes = [5, 10, 15, 20, 25, 50, 100];
    const [pageSize, setPageSize] = useState(5);
    const [searchCriteria, setSearchCriteria] = useState("");
    const [sortBy, setSortBy] = useState("id,asc");
    const [searchCriteriaChanged, setSearchCriteriaChanged] = useState(false);
    const [objectsDisplayed, setObjectsDisplayed] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const rows = []
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const objCount = props.rows.length
    const titles = props.headers
    for (let t of props.rows) {
        rows.push(t)
    }

    function handlePageChange(event, value) {
        event.preventDefault();
        console.log('change page handler')
        setObjectsDisplayed(false);
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
        setObjectsDisplayed(false);
        setPageSize(event.target.value);
        setCurrentPage(1);
    }

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
                sort: sortBy,
                search: searchCriteria,
                userId: userId
            };
        } else {
            params = { page: currentPage === 0 ? 0 : currentPage - 1, size: pageSize, sort: sortBy, userId: userId };
        }

        console.log('default params: ', params);
        const list = await axios.get(url, {
            params: params,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
        console.log("default outbound url: ", url);
        console.log('inbound response: ', list);

        if (list.data.content !== availableObjects) {
            console.log('list data found: ', list.data);
            if (searchCriteriaChanged) {
                setCurrentPage(1);
                setSearchCriteriaChanged(false);
            }
            setAvailableObjects(list.data);
            setObjectsDisplayed(true);
            setNumberOfPages(list.data.totalPages);
            setCurrentObject(availableObjects[0]);
        }
    },
        [availableObjects, searchCriteriaChanged, token, pageSize, currentPage, searchCriteria, sortBy, rows],
    )

    useEffect(() => {
        if (!objectsDisplayed) {
            getList();
        }
    }, [getList, availableObjects, objectsDisplayed, titles, url, rows, pageSize, currentPage]);

    function addToSort(event) {
        let sort = sortBy;
        let field = {};
        let title = titles[event.target.id];
        if (title.active === true) {
            field = toggleDirection(title);
            sort += '&sort=' + field.id + ',' + field.direction;
        } else {
            console.log('title sorting: ', title.id)
            title.direction = 'asc'; title.active = true;
            titles[title.sequence] = title;
            sort += '&sort=' + title.id + ',' + title.direction
        }
        console.log('sort created: ', sort)
        setObjectsDisplayed(false)
        setSortBy(sort)
    }

    function openModal(props) {
        console.log('openmodal found: ', props)
        switch (pageTitle) {
            case 'Account':
                console.log('account found')
                setCurrentObject(props);
                setShow(true)
                console.log('openmodal local show: ', show)
                console.log('page title: ', pageTitle)
                break;
            case 'Loan':
                console.log('loan found')
                setCurrentObject(props);
                setShow(true)
                break;
        }
    }

    function toggleDirection(field) {
        if (field.direction === 'asc') {
            field.direction = 'desc';
        } else {
            // setSortBy('id,asc,' + userId + ',')
            field.direction = 'asc';
        }

        return field;
    }

    function typeSelector() {
        const rows = []
        const row = []
        try {
        switch (pageTitle) {
            case 'Account':
                for (let i = 0; i < availableObjects.size; i++) {
                    row.push(
                        <tr><td className={'align-middle text-center'} >{availableObjects.content[i].type.name}</td>
                            <td className={'align-middle text-center'} >{availableObjects.content[i].nickname}</td>
                            <td className={'align-middle text-center'} >{availableObjects.content[i].interest}%</td>
                            <td className={'align-middle text-center'} >{CurrencyValue.from(availableObjects.content[i].balance).toString()}</td>
                            <td className={'align-middle text-center'} >{availableObjects.content[i].type.description}</td>
                            <td className={'align-middle text-center'} >{availableObjects.content[i].createDate}</td>
                            <td className={'align-middle text-center'}>
                                <button className={'btn btn-primary btn mx-3'}
                                    onClick={() => openModal(availableObjects.content[i])}
                                    id={'reviewBtn'}>
                                    Review/Pay
                                </button>
                            </td></tr>)
                }
                rows.push(row)
                return rows;
            case 'Loan':
                for (let i = 0; i < availableObjects.size; i++) {
                    row.push(
                        <tr><td className={'align-middle text-center'}>{availableObjects.content[i].loanType.typeName}</td>
                            <td className={'align-middle'}>{availableObjects.content[i].loanType.description}</td>
                            <td className={'align-middle text-center'}>{availableObjects.content[i].loanType.apr + '%'}</td>
                            <td className={'align-middle text-center'}>{CurrencyValue.from(availableObjects.content[i].principal).toString()}</td>
                            <td className={'align-middle text-center'}>{CurrencyValue.from(availableObjects.content[i].balance).toString()}</td>
                            <td className={'align-middle text-center'}>{availableObjects.content[i].nextDueDate}</td>
                            <td className={'align-middle text-center'}>{availableObjects.content[i].hasPaid == true ? 'You\'ve paid!' : 'Yet to Pay.'}</td>
                            <td className={'align-middle text-center'}>{CurrencyValue.from(availableObjects.content[i].minDue).toString()}</td>
                            <td className={'align-middle text-center'}>{CurrencyValue.from(availableObjects.content[i].lateFee).toString()}</td>
                            <td className={'align-middle text-center'}>{availableObjects.content[i].createDate}</td>
                            <td className={'align-middle text-center'}>
                                <button className={'btn btn-primary btn mx-3'}
                                    onClick={() => openModal(availableObjects.content[i])}
                                    id={'reviewBtn'}>
                                    Review/Pay
                                </button>
                            </td></tr>)
                }
                rows.push(row)
                return rows;
        }
    } catch (e) {
        console.log('error: ', e)
        return (<tr><td>There was an error with your data. Please contact customer support for more information.</td></tr>)
    }

    }
    return (
        <section className={'container'}>
            <h1 className={'text-center mt-5'}>Your {pageTitle}s:</h1>
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
            <div className={'mt-5'}>
                <Table striped bordered hover className={'me-3 table-responsive'} data-sortable={'true'}
                    data-toggle={'table'} id={'table'}>
                    <thead>
                        <tr>
                            {titles && titles.map(title => (
                                <th className={'align-middle text-center'} data-sortable={'true'}
                                    scope={'col'} onClick={addToSort} name={title.id}
                                    id={title.sequence}>{title.title}{titles[title.sequence].active === true && (titles[title.sequence].direction === 'asc' ? '  ↑' : '  ↓')}</th>
                            ))}
                            <th className={'align-middle text-center'}>{pageTitle} Interaction</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            typeSelector()
                        }
                    </tbody>

                    {show === true && pageTitle === 'Loan' &&
                        <>
                            <Modal show={show} onHide={handleClose} contentClassName="modal-style">
                                <Modal.Header closeButton>
                                    <Modal.Title>
                                        Your {currentObject.typeName} Loan:
                                    </Modal.Title>
                                </Modal.Header>
                                <LoanModal loan={currentObject} />
                            </Modal>
                        </>}
                    {show === true && pageTitle === 'Account' &&
                        <>
                            <Modal show={true} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>
                                        Your {currentObject.type.name} Account:
                                    </Modal.Title>
                                </Modal.Header>
                                <AccountModal account={currentObject} show={show} /></Modal>
                        </>}
                </Table>
                <Pagination className={'my-3'} count={numberOfPages} page={currentPage} siblingCount={1}
                    boundaryCount={1} onChange={handlePageChange} />
            </div>
            <script>$('#table').DataTable()</script>
        </section>
    )
}
export default DefaultTable