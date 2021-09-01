import {useContext, useEffect, useState} from "react";
import axios from "axios";
import AuthContext from "../../../store/auth-context";
import CardsList from "./CardsList";

/**
 * This function returns a page that retrieves and displays a list of all
 * cards associated with the currently logged in user.
 *
 * @author Matthew Crowell <Matthew.Crowell@Smoothstack.com>
 *
 * @returns {JSX.Element} the page that displays the retrieved table
 * @constructor
 */
function UserCards(){
    const authContext = useContext(AuthContext);
    const userId = authContext.userId;
    const token = authContext.token;
    const url = 'http://localhost:9001/cards/' + userId + "/all";
    const [cardsList, setCardsList] = useState();
    const [cardsDisplayed, setCardsDisplayed] = useState(false);

    useEffect(() => {
        /**
         * This function retrieves the list of cards and updates the page's state.
         *
         * @returns {Promise<void>}
         */
        async function getList(){
            const list = await axios.get(url, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            });

            if(list.data !== cardsList){
                setCardsList(list.data.content);
                setCardsDisplayed(true);
            }
        }

        if(!cardsDisplayed){
            getList();
        }

    }, [cardsList, cardsDisplayed, token, url]);

    return(
        <section className={'container'}>
            <ul>
                <h2 className={'d-flex my-3'}>Your Cards</h2>
                <CardsList cards={cardsList}/>
            </ul>
        </section>
    );
}

export default UserCards;
