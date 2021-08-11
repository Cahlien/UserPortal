import React, {useContext, useState} from 'react';
import {useHistory} from "react-router-dom";
import ActionContext from "../../../store/action-context";

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
    const [cardId, setCardId] = useState();
    const actionContext = useContext(ActionContext);

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
            <div className={'offset-4 col-5 vertical-center'}>
                <p>Sign up for this totally irrelevant dummy card!
                    <button className={'btn btn-primary btn-sm mx-3'} onClick={onSignUp} id={'dummy'}>Sign Up</button>
                </p>
            </div>
        </section>
    );
}

export default CardTypes;