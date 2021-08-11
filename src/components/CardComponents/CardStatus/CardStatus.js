import axios from "axios";
import {useContext, useEffect, useState} from "react";
import ActionContext from "../../../store/action-context";
import AuthContext from "../../../store/auth-context";
import {Link, useParams} from "react-router-dom";
import {Table} from "react-bootstrap";

function CardStatus(){
    const {cardId} = useParams();
    const authContext = useContext(AuthContext);
    const actionContext = useContext(ActionContext);
    const [errorMessage, setErrorMessage] = useState();
    const [cardStatus, setCardStatus] = useState();
    const [hasLoaded, setHasLoaded] = useState(false);
    const userId = authContext.userId;
    const token = authContext.token;
    const url = 'http://localhost:9001/cards/' + userId + '/' + cardId;

    useEffect(() => {
        if(!hasLoaded){
            async function fetchCardStatus(){
                if(!hasLoaded){
                    const results = await axios.get(url, {
                        headers: {
                            'Authorization': token,
                            'Content-Type': 'application/json'
                        }
                    });

                    if(results){
                        setCardStatus(results.data);
                        setHasLoaded(true);
                    }
                }


            }

            try {
                fetchCardStatus()

                console.log(cardStatus);
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
            <h2 className={'my-3'}>{cardStatus?.nickname}</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Last Four</th>
                    <th>Current Balance</th>
                    <th>Interest Rate</th>
                    <th>Expiration Date</th>
                    <th>Card Type</th>
                    <th>Active</th>
                </tr>
                </thead>
                <tbody>
                <tr key={cardStatus?.cardNumber}>
                    <td>{cardStatus?.cardNumber.slice(15,19)}</td>
                    <td>{'$' + cardStatus?.balance.toFixed(2)}</td>
                    <td>{cardStatus?.interestRate.toFixed(1) + '%'}</td>
                    <td>{cardStatus?.expireDate.slice(5,7) + '/' + cardStatus?.expireDate.slice(2, 4)}</td>
                    <td>{cardStatus?.cardType}</td>
                    <td>{cardStatus?.activeStatus.toString()}</td>
                </tr>
                </tbody>
            </Table>        </section>

    );
}

export default CardStatus;