import React, {useContext, useState} from 'react';
import {useHistory} from "react-router-dom";
import ActionContext from "../../store/action-context";

function CardTypes(props){
    const history = useHistory();
    const [cardId, setCardId] = useState();
    const actionContext = useContext(ActionContext);
    function handleSignUp(event){
        event.preventDefault();
        onSignUp(event);
    }

    function onSignUp(event){
        actionContext.action(event.currentTarget.id);
        history.push('/cardsignup');
    }

    return (
        <section className={'container'}>
            <div className={'offset-4 col-5'} >
                <p>Sign up for this card!
                    <button className={'btn btn-primary mx-3'} onClick={onSignUp} id={'cardOne'}>Sign Up</button>
                </p>
            </div>
        </section>
    );
}

export default CardTypes;