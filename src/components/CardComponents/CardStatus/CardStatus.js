import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../store/auth-context";
import { useHistory, useParams } from "react-router-dom";
import Centerpiece from "../../LayoutComponents/Centerpiece/Centerpiece";
import TransactionsList from "../../TransactionComponents/TransactionsList";
import { Modal, Button } from "react-bootstrap";
import { CurrencyValue } from "../../../models/currencyvalue.model";

/**
 * This function returns a page showing the details and status of a
 * single, specified card associated with the currently logged in user.
 *
 * @author Matthew Crowell <Matthew.Crowell@Smoothstack.com>
 *
 * @returns {JSX.Element} the page displaying the card details
 * @constructor
 */
function CardStatus(props) {
    console.log('props rcvd: ', props)
    const history = useHistory();
    const [cardId, setCardId] = useState(props.card.id);
    const authContext = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState();
    const [cardStatus, setCardStatus] = useState();
    const [hasLoaded, setHasLoaded] = useState(false);
    const userId = authContext.userId;
    const token = authContext.token;
    const url = 'http://localhost:9001/cards/' + userId + '/' + cardId;

    useEffect(() => {
        setCardId(props.card.id)
        if (!hasLoaded) {
            /**
             * This function retrieves the card details and updates the state of the
             * card status page.
             *
             * @returns {Promise<void>}
             */
            async function fetchCardStatus() {
                if (!hasLoaded) {
                    const results = await axios.get(url, {
                        headers: {
                            'Authorization': token,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (results) {
                        setCardStatus(results.data);
                        setHasLoaded(true);
                    }
                }


            }

            try {
                fetchCardStatus()
            } catch (e) {
                if (e.response) {
                    setErrorMessage(e.response.data.message);
                } else {
                    setErrorMessage('Something went wrong... please try again later');
                }
            }
        }

    }, [hasLoaded, url, token, cardStatus]);

    return (
        <section className={'container'}>
            <Modal.Body >
                {errorMessage && <div className={'alert-danger mt-5'}>{errorMessage}</div>}
                <div className="form-group">
                    <div className="input-group mb-2">
                        <label id="typeLabel" className="input-group-text">Card Number</label>
                        <input id="typeText" type="text" disabled={true} className="form-control" value={props.card.cardNumber}></input>
                    </div>
                    <div className="input-group mb-2">
                        <label id="typeLabel" className="input-group-text">Nickname:</label>
                        <input id="typeText" type="text" disabled={true} className="form-control" value={props.card.nickname}></input>
                    </div>
                    <div className="input-group mb-2">
                        <label id="descriptionLabel" className="input-group-text">Description:</label>
                        <textarea value={props.card.cardType.description} id="descriptionText" className="form-control" readOnly="readonly">
                            {props.card.cardType.description}
                        </textarea>
                    </div>
                    <div className="input-group mb-2">
                        <label id="interestLabel" className="input-group-text">Interest:</label>
                        <input id="interestText" className="form-control" type="text" disabled={true} value={props.card.interest + '%'}></input>
                    </div>
                    <div className="input-group mb-2">
                        <label id="amountLabel" className="input-group-text">Amount:</label>
                        <input id="amountText" className="form-control" type="text" disabled={true} value={CurrencyValue.from(props.card.balance).toString()}></input>
                    </div>
                    <div className="input-group mb-2">
                        <label id="createDateLabel" className="input-group-text">Date Created:</label>
                        <input id="createDateText" className="form-control" type="text" disabled={true} value={props.card.createDate}></input>
                    </div>
                </div>
                <TransactionsList />
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    onClick={(event) => {
                        event.preventDefault();
                        if (authContext.userIsLoggedIn) {
                            setErrorMessage("Payments not implemented yet...")
                        } else {
                            history.push('/auth');
                        }
                    }}>
                    Make Payment
                </Button>
            </Modal.Footer>
        </section>

    );
}

export default CardStatus;
