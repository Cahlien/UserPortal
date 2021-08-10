import {useContext, useEffect, useState} from "react";
import axios from "axios";
import AuthContext from "../../store/auth-context";
import CardsList from "./CardsList";

function UserCards(){
    const authContext = useContext(AuthContext);
    const userId = authContext.userId;
    const token = authContext.token;
    const url = 'http://localhost:9001/cards/' + userId + "/all";
    const [cardsList, setCardsList] = useState();
    const [cardsDisplayed, setCardsDisplayed] = useState(false);

    useEffect(() => {
        async function getList(){
            const list = await axios.get(url, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            });

            if(list.data !== cardsList){
                setCardsList(list.data);
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