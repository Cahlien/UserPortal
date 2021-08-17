import React, {useContext, useEffect, useState} from 'react';
import Pagination from '@material-ui/lab/Pagination';
import axios from "axios";
import {useHistory} from "react-router-dom";
import ActionContext from "../../../store/action-context";
import AuthContext from "../../../store/auth-context";
import {Table} from "react-bootstrap"

/**
 * This function returns a page that lists the cards currently available from
 * BeardTrust.
 *
 * @author Matthew Crowell <Matthew.Crowell@Smoothstack.com>
 *
 * @param props
 * @returns {JSX.Element} the page displaying all available cards
 * @constructor
 */
function CardTypes(props) {
    const history = useHistory();
    const actionContext = useContext(ActionContext);
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const [availableCards, setAvailableCards] = useState();
    const [cardsDisplayed, setCardsDisplayed] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [searchCriteria, setSearchCriteria] = useState();
    const [sortBy, setSortBy] = useState("id,asc");
    const url = 'http://localhost:9001/cards/available'
    const [numberOfPages, setNumberOfPages] = useState(10);
    const pageSizes = [2, 5, 10, 15, 20, 25]

    /**
     * This function retrieves the list of cards the bank offers and updates the page's state.
     *
     * @returns {Promise<void>}
     */
    async function getList() {
        const params = {search: searchCriteria, page: currentPage, size: pageSize, sortBy:sortBy};

        const list = await axios.get(url, {
            params: params,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        if (list.data.content !== availableCards) {
            setAvailableCards(list.data.content);
            setNumberOfPages(list.data.content.totalPages);
            setCardsDisplayed(true);
        }
    }

    useEffect(() => {
        if (!cardsDisplayed) {
            getList();
        }

    }, [availableCards, cardsDisplayed, token, url]);

    /**
     * This function handles a click on the sign up button.
     *
     * @param event the click event
     */
    function handleSignUp(event) {
        event.preventDefault();
        onSignUp(event);
    }

    /**
     * This function is called whenever the page number is changed and adjusts
     * the state of the component to send the appropriate request and render
     * the page correctly given the updated page number.
     *
     * @param event the event fired by changing the page number
     * @param value the value selected for the new current page
     */
    function handlePageChange(event, value){
        setCardsDisplayed(false);
        setCurrentPage(value-1);
    }

    /**
     * This function is called whenever the search criteria is changed and adjusts
     * the state of the component to send the appropriate request and render the
     * component correctly given the updated search criteria.
     *
     * @param event the event fired by changing the search criteria
     * @param value the value entered for the new search criteria
     */
    function handleSearchCriteriaChange(event){
        setSearchCriteria(event.target.value);
    }

    /**
     * This function is called whenever the page size is changed.
     *
     * @param event the event fired by selecting a new page size
     */
    function handlePageSizeChange(event){
        setPageSize(event.target.value);
        setCurrentPage(0);
        setCardsDisplayed(false);
    }

    /**
     * This function sets the targetId in the action context and moves the user to
     * the sign up page for the selected card.
     *
     * @param event the click event
     */
    function onSignUp(event) {
        actionContext.action(event.currentTarget.id);
        history.push('/cardsignup');
    }

    return (
        <section className={'container'}>
            <h1 className={'text-center mt-5'}>The Cards of BeardTrust</h1>
            <div className={'mt-5'}>
                <div>
                    <div className={'input-group mb-3'}>
                        <div className={'me-5 col-xs-12 col-lg-2'}>
                        <span className={'align-middle'}>
                            {'Items per Page: '}
                        </span>
                            <select className={'text-center align-middle'} onChange={handlePageSizeChange} value={pageSize}>
                                {pageSizes.map((size) => (
                                    <option key={size} value={size}>{size}</option>
                                ))}
                            </select>
                        </div>
                        <span className={'text-center col-sm-0 col-md-4 col-lg-6 col-xl-7'}></span>

                        <input type={'text'} className={'form-control col-xs-12 col-md-2'} placeholder={'Search'} value={searchCriteria}
                               onChange={handleSearchCriteriaChange}/>
                            <button className={'btn btn-outline-secondary'} type={'button'} onClick={getList}>Search</button>

                    </div>
                </div>

                <Table striped bordered hover style={{marginRight: 5 + 'px'}}>
                    <thead>
                    <tr>
                        <th></th>
                        <th className={'align-middle text-center'}>Card</th>
                        <th>Description</th>
                        <th className={'align-middle text-center'}>Interest Rate</th>
                        <th className={'align-middle text-center'}>Sign Up</th>
                    </tr>
                    </thead>
                    <tbody>
                    {availableCards && availableCards.map(card => (
                        <tr>
                            <td className={'align-middle text-center'}><img src={card.previewURL}
                                                                            alt={'Preview of credit card with the id ' + card.id}/>
                            </td>
                            <td className={'align-middle text-center'}>{card.typeName}</td>
                            <td className={'align-middle'}>{card.description}</td>
                            <td className={'align-middle text-center'}>{card.baseInterestRate.toFixed(1) + '%'}</td>
                            <td className={'align-middle text-center'}>
                                <button className={'btn btn-primary btn-sm mx-3'} onClick={onSignUp}
                                        id={card.id}>Apply
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <Pagination className={'my-3'} count={numberOfPages} page={currentPage} siblingCount={1} boundaryCount={1} onChange={handlePageChange} />
            </div>
        </section>
    );
}

export default CardTypes;