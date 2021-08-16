import React, {useContext, useEffect, useState} from 'react';
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
    const url = 'http://localhost:9001/cards/available'

    useEffect(() => {
        /**
         * This function retrieves the list of cards the bank offers and updates the page's state.
         *
         * @returns {Promise<void>}
         */
        async function getList() {
            const list = await axios.get(url, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            });

            if (list.data !== availableCards) {
                setAvailableCards(list.data);
                setCardsDisplayed(true);
            }
        }

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
            <div className={'mt-5'}>
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
            </div>
        </section>
    );
}

export default CardTypes;